import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [id, setId] = useState('')
  const [colorToAdd, setColorToAdd] = useState(initialColor)

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
    setId(color.id)
  };

  const saveEdit = e => {
    e.preventDefault();

    axiosWithAuth().put(`http://localhost:5000/api/colors/${id}`, colorToEdit)
    .then(res => {
      const arr = [...colors]
      arr.map((el, index) => {
        if(res.data.id === el.id) {
          arr[index] = res.data;
        }
      })
      updateColors(arr)
    })
    .catch(err => console.log(err.response))

  };

  const deleteColor = color => {
    axiosWithAuth().delete(`http://localhost:5000/api/colors/${color.id}`)
    .then(res => {
      const arr = [...colors];
      updateColors(arr.filter(el => el.id !== color.id))
    })
    .catch(err => console.log(err.response))
  };

  const addColor = e => {
    e.preventDefault();
    axiosWithAuth().post(`http://localhost:5000/api/colors`, colorToAdd)
    .then(res => {
      updateColors([...colors, colorToAdd])
    })
    .catch(err => console.log(err.response))

}

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={() => deleteColor(color)}>
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div style={{position: 'absolute', bottom: '15px'}}>
        <h3>Add more colors</h3>
        <form onSubmit={addColor}>
        <label>
        color name:
        <input
          onChange={e =>
            setColorToAdd({ ...colorToAdd, color: e.target.value })
          }
          value={colorToAdd.color}
        />
        </label>
        <label>
          hex code:
          <input
            onChange={e =>
              setColorToAdd({
                ...colorToAdd,
                code: { hex: e.target.value }
              })
            }
            value={colorToAdd.code.hex}
          />
        </label>
          <div className="button-row">
              <button type="submit">Add A Color</button>
          </div>
        </form>
      </div>
      <div className="spacer" />
      
    </div>
  );
};

export default ColorList;
