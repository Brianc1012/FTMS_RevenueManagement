import React, {useState, useEffect} from 'react';
import '../styles/addExpense_itemList.css';

type Item = {
    name: string;
    price: string;
    quantity: string;
}

const addExpense_itemList = () => {
    //declare item states
    const [items, setItems] = useState<Item[]>([
        {name: '', price:'', quantity: ''},
    ]);

    //event Change handler
    const handleChange = (index: number, field: keyof Item, value: string) => {
        const updated = [...items];
        updated[index][field] = value;
        setItems(updated);

        //add new row if it is the last row
        if (index === items.length - 1 && (field === 'name' || field === 'price' || field === 'quantity') && value.trim() !== '' ) {
            setItems([...updated, {name:'', price: '', quantity: ''}])
        }
    };

    //Compute total per Item
    const totalComputation = (price: string, quantity: string) => {
        const p = parseFloat(price);
        const q = parseFloat(quantity);
        return isNaN(p) || isNaN(q) ? '' : (p * q).toFixed(2);
    };

    //Compute GrandTotal
    const grandTotal = items.reduce((sum, item) => {
        const total = parseFloat(totalComputation(item.price, item.quantity));
        return sum + (isNaN(total) ? 0 : total);
    }, 0)

  return (
    <div className='tableContainer'>
        <table className='itemList'>
            <thead>
                <tr>
                    <th>Items</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                </tr>
            </thead>
        </table>

            <div className='scrollable-tbody'>
                <table className='itemList'>
                    <tbody>
                        {
                            items.map((item, idx) => (
                                <tr key={idx} className={item.name || item.price || item.quantity ? '' : 'translucent'}>
                                    <td><input type='text' value={item.name} onChange={(e) => handleChange(idx, 'name', e.target.value)}/></td>
                                    <td><input type='number' value={item.price} onChange={(e) => handleChange(idx, 'price', e.target.value)}/></td>
                                    <td><input type='number' value={item.quantity} onChange={(e) => handleChange(idx, 'quantity', e.target.value)}/></td>
                                    <td>{totalComputation(item.price, item.quantity)}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                
            </div>
        <hr/>
        <table className='tableContainer'>
            <tbody className='grandTotal'>
                <tr>
                    <td><h3>Total:</h3></td>
                    <td></td>
                    <td></td>
                    <td><h3>{grandTotal.toFixed(2)}</h3></td>
                </tr>
            </tbody>
        </table>
    </div>
  )
}

export default addExpense_itemList