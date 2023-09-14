import Transaction from "./components/Transaction";
import FormComponent from "./components/FormComponent";
import './App.css'
import { useState,useEffect } from "react";
import DataContext from "./data/DataContext";
import ReportComponent from "./components/ReportComponent";

function App() {
  const design = {color:"red",textAlign:"center",fontSize:"1.5rem", margin:"20px 0"}


 
  const [items,setItems] = useState([])
  const [reportIncome,setReportIncome] = useState(0)
  const [reportExpense,setReportExpense] = useState(0)
  const onAddNewItem = (newItem)=>{
    setItems((prevItem)=>{
      return [newItem,...prevItem]
    });
  }

  useEffect(()=>{
    const amounts = items.map(items=>items.amount)
    const income = amounts.filter(element=>element>0).reduce((total,element)=>total+=element,0)
    const expense = (amounts.filter(element=>element<0).reduce((total,element)=>total+=element,0))*-1
    setReportIncome(income)
    setReportExpense(expense)
  },[items,reportIncome,reportExpense])

  return (
    <DataContext.Provider value={
      {
        income : reportIncome,
        expense: reportExpense,
      }
    }>
      <div className="container">
        <h1 style={design}>โปรแกรมบัญชีรายรับ - รายจ่าย</h1>
        <ReportComponent/>
        <FormComponent onAddItem={onAddNewItem}/>
        <h1 style={design}>รายการ</h1>
        <Transaction items={items}/>
      </div>
    </DataContext.Provider>
  );
}

export default App;
