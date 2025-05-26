import { useState, useEffect } from "react";
import EditableImage from "./EditableImage";

export default function MenuItemForm({ onSubmit, menuItem }) {


    const [image, setImage] = useState(menuItem?.image && null);
    const [name, setName] = useState(menuItem?.name || '');
    const [description, setDescription] = useState(menuItem?.description || '');
    const [price, setPrice] = useState(menuItem?.price || '');

  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState(menuItem?.category || '');

    
    useEffect(() => {
    fetch('/api/categories').then(res => {
      res.json().then(categories => {
        setCategories(categories);
      });
    });
  }, []);

    return (
        <div className="md:grid items-top mb-2 max-w-md mx-auto " style={{
            gridTemplateColumns: '.3fr .7fr'
        }}>
            <div className="p-2 rounded-lg relative max-w-[120px] mt-12">
                <EditableImage link={image} setLink={setImage} />
            </div>
            <form onSubmit={ev => onSubmit(ev, {name, description, price, image, category})} className="mt-8 w-full">
                <div className="flex gap-2 items-end">
                    <div className="grow">
                        <label>Items Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={ev => setName(ev.target.value)}
                        />
                        <label>Description</label>
                        <input
                            type="text"
                            value={description}
                            onChange={ev => setDescription(ev.target.value)}
                        />
                        <label>Price</label>
                        <input
                            type="text"
                            value={price}
                            onChange={ev => setPrice(ev.target.value)}
                        />
                        <label>Catogory</label>
                        <select value={category} onChange={(ev)=>setCategory(ev.target.value)}>
                            <option value="">default</option>
                            {categories?.length >0 && categories.map(c =>(
                                <option value={c._id} key={c._id}>{c.name}</option>
                            ))}
                        </select>
                        <button type="submit">Save</button>
                    </div>
                </div>
            </form>
        </div>
    );

}