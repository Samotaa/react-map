import "leaflet/dist/leaflet.css"
import './edit.sass'
import React, {useMemo, useState, useEffect } from 'react'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Button } from 'antd';
import ModalEdit from '../ModalEdit/ModalEdit'
import ModalCreate from '../ModalCreate/ModalCreate'

export default function EditPage() {

    const [data, setData] = useState()
    const [modalEdit, setModalEdit] = useState(false)
    const [modalCreate, setModalCreate] = useState(false)
    const [editable, setEdit] = useState()

    const localData = localStorage.getItem('data')
    
    useEffect(() => {
        setData(JSON.parse(localData))
      }, [localData])

    function deleteItem(indexDelete) {
        const newData = data.filter((value, index) => {
            return index !== indexDelete
        })
        setData(newData)
        setLocal(newData)
    }

    function modalWindowEdit(index) {
        setModalEdit(true)
        setEdit(index)
    }

    function setLocal(localValue) {
        localStorage.setItem('data', JSON.stringify(localValue))
    }
    
    function modalWindowCreate() {
        setModalCreate(true)
    }
    return (
        <>
            <div className='edit__container'>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Имя</th>
                            <th>Тип</th>
                            <th>Координаты</th>
                            <th>Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.map((val, index) => {
                            return (
                                <tr className='table__rows' key={index} >
                                    <td className='first__row'>
                                        {val.name}
                                    </td>
                                    <td className='second__row' >
                                        {val.type == 'marker' ? 'Точка' : 'Линия'}
                                    </td>
                                    <td className='third__row' >
                                        {val.coordinates}
                                    </td>
                                    <td className='action__buttons' >
                                        <Button onClick={() => deleteItem(index)} type="primary" icon={<DeleteOutlined />} />
                                        <Button onClick={() => modalWindowEdit(index)} type="primary" icon={<EditOutlined />}  />
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>                   
                </table>
                    <Button className='create__element' onClick={() => modalWindowCreate()}  type="primary">Создать элемент</Button>
                    {modalEdit && <ModalEdit active={modalEdit} setModal={setModalEdit} editable={editable} data={data} />} 
                    {modalCreate && <ModalCreate active={modalCreate} setModal={setModalCreate} data={data}/>} 
            </div>
        </>
    )
}


