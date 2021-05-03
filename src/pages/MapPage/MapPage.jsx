import { red } from "@material-ui/core/colors";
import { colors } from "material-ui/styles";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MaterialTable from 'material-table'
import { listActions } from "../../_actions";
import Map from "../../_components/map/map";
import Pagination from "../../_components/pagination/pagination";

function MapPage() {
  const list = useSelector((state) => state.list);
  const [currentItems, setCurrentItems] = useState([]);
  const [selectedPositions, setSelectedPositions] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listActions.getAll());
   // setSelectedPositions(positions);
  }, []);

  function handleDeleteItem(id) {
    dispatch(listActions.delete(id));
  }

  function onChangePage(pager) {
    setCurrentItems(pager.items);
  }

  function onRowSelected(item) {
   
    const mapPositions = [
      {
        
        key: item.id,
        lat: +item.latitude,
        lng: +item.longitude,
        title: `company: ${item.company}`,
        description:`adress: ${item.address}`,
       }//,{
      //   key: item.id+1,
      //   lat: item.positions[1].lat,
      //   lng: item.positions[1].lng,
      //   title: `userId ${item.userId}`,
      //   description: item.title,
      // }
    ];
    setSelectedPositions(mapPositions);
    
   
  }


  

  

  return (
    <>
      <div  className="row">
        <div className="col">
          <div className="row">
            <div className="col" className="color2">
              {list.loading && <em>Loading items...</em>}
              {list.error && (
                 <span className="text-danger">ERROR: {list.error}</span>
              )}
              {currentItems && (
                <div style={{ maxWidth: '100%' }}>
             <MaterialTable  onRowClick={(event, rowData) => {
                     onRowSelected(rowData)}}

               columns={ [
                 { title: 'firstname', field: 'firstname',type: 'string' },
                 { title: 'lastname', field: 'lastname',type: 'string' },
                 { title: 'commpany', field: 'commpany',type: 'string' },
                 { title: 'email', field: 'email',type: 'string' },
                
               ]}
               data={currentItems.map((item)=>{return {firstname:item.name.first,lastname:item.name.last,commpany:item.company,email:item.email,latitude:item.latitude,longitude:item.longitude,company:item.company,address:item.address}})}
               title="DATA"
             />
           </div>
              )}
            </div>
            <Pagination  items={list.items} onChangePage={onChangePage} />
          </div>
        </div>
        <div className="col-3">
          {selectedPositions && <Map positions={selectedPositions} />}
        </div>
      </div>
    </>
  );
}

export { MapPage };