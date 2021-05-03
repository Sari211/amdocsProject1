import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MaterialTable from 'material-table'
import { listActions } from '../../_actions';
import Pagination from '../../_components/pagination/pagination';

function ListPage() {
    const list = useSelector(state => state.list);
    const [currentItems, setCurrentItems] = useState([]);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listActions.getAll());
    }, []);



    function handleDeleteItem(id) {
        dispatch(listActions.delete(id));
    }

    function onChangePage(pager){
        console.log("pager", pager);
        setCurrentItems(pager.items);
    }

    return (
        <>
        <div className="col-lg-20 ">
            {list.loading && <em>Loading items...</em>}
            {list.error && <span className="text-danger">ERROR: {list.error}</span>}
            {currentItems &&
           <div style={{ maxWidth: '100%' }}>
             <MaterialTable 
               columns={[
                 { title: 'firstname', field: 'firstname',type: 'string' },
                 { title: 'lastname', field: 'lastname',type: 'string' },
                 { title: 'commpany', field: 'commpany',type: 'string' },
                 { title: 'email', field: 'email',type: 'string' },
                
               ]}
               data={currentItems.map((item)=>{return {firstname:item.name.first,lastname:item.name.last,commpany:item.company,email:item.email}})}
               title="DATA"
             />
           </div>
                // <ul>
                //     {currentItems.map((item, index) =>
                //         <li key={item.id}>
                //             {item.title}
                //         </li>
                //     )}
                // </ul>
            }
        </div>
        <Pagination  items={list.items} onChangePage={onChangePage} />
        </>
        
    );
}

export { ListPage };