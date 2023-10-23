import { message } from 'antd';
import { Button, Card, Input, List, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import styles from './index.less';
import GlobalLoading from '@/components/GlobalLoading';

import {
  CloseOutlined
} from '@ant-design/icons';
import { connect } from 'umi';


const App: React.FC = (props) => {

  const allFoods = props.foods;
  const [selected, setSelected] = useState([]);
  const [activeToSelect, setActiveToSelect] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if(e.target.value){
      setInputValue(e.target.value)
    }
  };

  const selfInput = () => {
    if(!inputValue){
      return
    }
    if(selected.indexOf(inputValue) > -1){
      message.warn(`${inputValue} already choosed`)
    }else{
      setSelected([...selected, inputValue]);
      setInputValue('');
    }
  }

  useEffect(() => {
    props.queryFoodList()
  }, [])

  useEffect(() => {
    if(allFoods.length > 0){
      setActiveToSelect(allFoods.slice(0, 10))
    }
  },[allFoods])

  useEffect(() => {
    if( activeToSelect.length < 10){



      let toremove = [...selected, ...activeToSelect];
      let newAllFoods = [...allFoods]
      for (let index = 0; index < toremove.length; index++) {

        const element = toremove[index];

        let f_index = newAllFoods.indexOf(element);
        if(f_index > -1){
          newAllFoods.splice(f_index, 1)
        }
      }
      if(newAllFoods.length > 0){

        let newActiveToSelect = [...activeToSelect]
        newActiveToSelect.push(newAllFoods[0])
        setActiveToSelect(newActiveToSelect)
      }
    }
  },[selected])

  


  return (
    <div className={styles.container}>
      <Card title="Explore the food trucks" loading={props.loading["effects"]["home/queryFoodList"] === true} headStyle={{textAlign:"center"}} bordered={false} style={{ width: 500 }}>
        {/* <Divider plain>Click to choose</Divider> */}
        <div className={styles.toselect}>

          {activeToSelect.length > 0 ? (
            <>
            { activeToSelect.map(item =>{
                return (
                  <Button key={item} className={styles.toselectbtn} shape="round" onClick={(e) => {
                    const index = activeToSelect.indexOf(item);

                    const newActiveToSelect = [...activeToSelect]
                    newActiveToSelect.splice(index, 1);

                    setSelected([...selected, item])
                    setActiveToSelect(newActiveToSelect)
                   
                  }}>{item}</Button>
                )
            }
              
            )}
            </>
          ):(
            <p>loading</p>
          )}
        </div>
        <Input.Group compact>
          <Input style={{ width: 'calc(100% - 66px)' }} onPressEnter={selfInput} value={inputValue} onChange={onInputChange} placeholder="You can also input something you like" />
          <Button type="ghost" onClick={selfInput}>Enter</Button>
        </Input.Group>
        
        <div className="bg-slate-100">
          <div className={styles.selected}>
            { selected.length > 0 ? (
              <>
              { selected.map(item =>{
                return (
                  <Button type='primary' key={item} className={styles.selectedbtn} shape="round">{item} <CloseOutlined onClick={() => {
                      const index = selected.indexOf(item);
                      const newSelected = [...selected]
                      newSelected.splice(index, 1);
                      setSelected(newSelected)
                    }} 
                  /></Button>
                )
              }
              )}
              </>
            ):(
              <p className='text-center w-full'>Choose at least one to get start</p>
            )}
          </div>
        </div>
        <Button danger className='w-full' disabled={selected.length === 0} onClick={() => props.queryTruckList({keywords: [...selected].map((i) => i.toLowerCase())})}>Get start</Button>
        <div className={styles.resultlist}>
          <List
            // header={<div>Header</div>}
            // footer={<div>Footer</div>}
            bordered
            dataSource={props.trucks}
            renderItem={item => (
              <List.Item className='block'>
                <Typography.Text className='block'><strong>Applicant: </strong> {item.applicant} </Typography.Text>
                <Typography.Text className='block'><strong>Location: </strong> {item.locationdescription} </Typography.Text>
                <Typography.Text className='block'><strong>Fooditems: </strong> {item.fooditems} </Typography.Text>
              </List.Item>
            )}
          />
          <GlobalLoading spinning={props.loading["effects"]["home/queryTruckList"] === true} />
        </div>
        
      </Card>
      
    </div>
  );

}
  

const mapStateToProps = ({ loading, home }) => ({
  loading,
  foods: home.foods,
  trucks: home.trucks,
});

const mapDispatchToProps = dispatch => ({
  queryFoodList() {
    return dispatch({
      type: 'home/queryFoodList'
    });
  },
  queryTruckList(data) {
    return dispatch({
      type: 'home/queryTruckList',
      payload: data
    });
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(App);;
