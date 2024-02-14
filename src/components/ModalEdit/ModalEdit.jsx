import React, {useState, useEffect, useMemo, useRef} from 'react'
import './modaledit.sass'
import { Input, Select, Modal } from 'antd';
import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'
import { Marker } from 'react-leaflet/Marker'
import { Polyline, Popup, FeatureGroup } from 'react-leaflet';
import { Button } from 'antd';
import { EditControl } from 'react-leaflet-draw';
import "leaflet/dist/leaflet.css"

export default function ModalEdit(props) {

    const a = props?.data?.find((value, index) => index == props.editable)
    const limeOptions = { color: 'lime' }

    const mapRef = useRef(null);

    const [name, setName] = useState(a.name)
    const [type, setType] = useState(a.type)
    const [coordinates, setCoordinates] = useState(a.coordinates)
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    function newName(event) {
        setName(event.target.value)
    }

    function newType(type) {
        setType(type)
        clearMap()
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


    const onCreate = e => {
        if (e.layerType == 'polyline') {
            const arr = e.layer._latlngs.map((value, index) => [value.lat, value.lng])
            setCoordinates(arr)
        } else {
            setCoordinates([e.layer._latlng.lat, e.layer._latlng.lng])
        }
    }

    function saveEdit(){
        const without = props?.data?.filter((value, index) => index !== props.editable)
        if (coordinates.length > 0) {
            without.push({name: name, type: type, coordinates: coordinates})
            localStorage.setItem('data', JSON.stringify(without))
            props.setModal(false)
        } else {
            setIsModalOpen(true)
        }
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
                    <Input  className='modal__input' placeholder="Введите название" value={name} onChange={newName} size="small"/>
                    <Select
                        className='modal__select'
                        defaultValue={type}
                        onChange={newType}
                        style={{ width: 120 }}
                        options={[{ value: 'marker', label: 'Точка' }, { value: 'polyline', label: 'Линия'}]}
                    />
                    <MapContainer ref={mapRef} style={{ width: "850px", height: "400px" }} center={type == 'marker' ? coordinates : coordinates[0]} zoom={13} scrollWheelZoom={true}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <FeatureGroup>
                            <EditControl 
                                position='topright'
                                onCreated={onCreate}
                                draw={{
                                    rectangle: false,
                                    polyline: type == 'polyline' ? true : false,
                                    marker: type == 'marker'? true : false,
                                    editable: false,
                                    circle: false,
                                    circlemarker: false,
                                    polygon: false,
                                
                                }}
                            />
                        </FeatureGroup>
                        {
                            type == 'marker' ?
                                coordinates.map((value, index) => {
                                    return (
                                        <Marker key={index} position={coordinates ?? []}>
                                            <Popup>
                                            A pretty CSS3 popup. <br /> Easily customizable.
                                            </Popup>
                                        </Marker>
                                    )
                                }) :                      
                                <Polyline pathOptions={limeOptions} positions={coordinates ?? [[]]} />
                        }                     
                    </MapContainer>
                    <Button className='modal__save' type="primary" onClick={saveEdit}>Сохранить</Button>
                    <Button className='modal__save' type="primary" onClick={() => props?.setModal(false)}>Отмена</Button>
                </div>
            </div>
        </div>
        
    )
}


