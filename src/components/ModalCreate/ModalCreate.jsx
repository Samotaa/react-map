import React, {useState, useEffect, useMemo, useRef} from 'react'
import './modalcreate.sass'
import { Input, Select, Button, Modal, Space, Typography } from 'antd';
import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'
import { Marker } from 'react-leaflet/Marker'
import { Polyline, Popup, FeatureGroup } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';

export default function ModalCreate(props) {

    const limeOptions = { color: 'lime' }
    const data = props?.data ?? []
    const [name, setName] = useState()
    const [type, setType] = useState()
    const [coordinates, setCoordinates] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false);

    const mapRef = useRef(null);

    function newName(event) {
        setName(event.target.value)
    }

    const onCreate = e => {
        if (e.layerType == 'polyline') {
            const arr = e.layer._latlngs.map((value, index) => [value.lat, value.lng])
            setCoordinates(arr)
        } else {
            setCoordinates([e.layer._latlng.lat, e.layer._latlng.lng])
        }
    }

    function newType(type) {
        setType(type)
        clearMap()
    }

    function saveCreate(){
        if (coordinates.length > 0) {
            data.push({name: name, type: type, coordinates: coordinates})
            localStorage.setItem('data', JSON.stringify(data))
            props.setModal(false)
        } else {
            setIsModalOpen(true);
        }
    }

    function clearMap() {
        const map = mapRef.current;
        if (map) {
          map.eachLayer(layer => {
                if (layer instanceof L.Marker || layer instanceof L.Path) {
              map.removeLayer(layer);
            }
          });
        }
        setCoordinates([])
    }

    function onCancel() {
        setIsModalOpen(false)
        props?.setModal(false)
    }

    return (
        <div>
            <Modal className='error__panel' title="Ошибка валидации" open={isModalOpen} onOk={() => setIsModalOpen(false)} onCancel={onCancel}>
                <p>Поставьте координаты элемента</p>
            </Modal>

            <div className={props?.active ? 'modal active' : 'modal'} onClick={() => props?.setModal(false)}>
        
            <div className='modal__content' onClick={e => e.stopPropagation()}>

                <Input className='modal__input' placeholder="Введите название" value={name} onChange={newName} size="small"/>
                <Select
                    className='modal__select'
                    defaultValue={type}
                    onChange={newType}
                    style={{ width: 120 }}
                    options={[{ value: 'marker', label: 'Точка' }, { value: 'polyline', label: 'Линия'}]}
                />
                <MapContainer ref={mapRef} style={{ width: "850px", height: "400px" }} center={[51.505, -0.09]} zoom={13} scrollWheelZoom={true}>
                    <FeatureGroup>
                        <EditControl 
                            position='topright'
                            onCreated={onCreate}
                            draw={{
                                rectangle: false,
                                polyline: (type == 'polyline') ? true : false,
                                circle: false,
                                circlemarker: false,
                                polygon: false,
                                marker: (type == 'marker') ? true : false
                            }}
                        />
                    </FeatureGroup>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />                 
                </MapContainer>
                <Button className='modal__save' type="primary" onClick={saveCreate}>Создать</Button>
                <Button className='modal__save' type="primary" onClick={() => props?.setModal(false)}>Отмена</Button>

            </div>
        </div>
        </div>
        
    )
}


