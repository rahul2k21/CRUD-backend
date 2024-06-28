import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import FormTable from "./components/FormTable";

axios.defaults.baseURL = "https://crud-backend-77xg.onrender.com";

function App() {
  const [addSection, setAddSection] = useState(false);
  const [editSection, setEditSection] = useState(false);
  const [userEditID, setUserEditID] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
  });

  const [formDataEdit, setFormDataEdit] = useState({
    name: "",
    email: "",
    mobile: "",
    _id: "",
  });

  const [dataList, setDataList] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await axios.post("/create", formData).then((response) => response.data);

    if (data.success) {
      setAddSection(false);
      alert(data.message);
      getFetchData();
    }
  };

  const handleOnChange = (e) => {
    const { value, name } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const getFetchData = async () => {
    try {
      const response = await axios.get("/");
      const result = response.data;
      setDataList(result.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    getFetchData();
  }, []);

  const handleDelete = async (id) => {
    const data = await axios.delete("/delete/" + id);
    if (data.data.success) {
      getFetchData();
      alert(data.data.message);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const data = await axios.put("/update/" + userEditID, formDataEdit).then((response) => response.data);
    if (data.success) {
      setEditSection(false);
      alert(data.message);
      getFetchData();
    }
  };

  const handleEditOnChange = (e) => {
    const { value, name } = e.target;
    setFormDataEdit((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEdit = (el) => {
    setFormDataEdit(el);
    setEditSection(true);
  };

  return (
    <>
    
      <div className="container">
        <button className="btn btn-add" onClick={() => setAddSection(true)}>
          Add
        </button>
        {addSection && (
          <FormTable
            handleSubmit={handleSubmit}
            handleOnChange={handleOnChange}
            handleClose={() => setAddSection(false)}
            formData={formData}
          />
        )}
        {editSection && (
          <FormTable
            handleSubmit={handleUpdate}
            handleOnChange={handleEditOnChange}
            handleClose={() => setEditSection(false)}
            formData={formDataEdit}
            setUserEditID={setUserEditID}
          />
        )}

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {dataList.length > 0 ? (
                dataList.map((el) => (
                  <tr key={el._id}>
                    <td>{el.name}</td>
                    <td>{el.email}</td>
                    <td>{el.mobile}</td>
                    <td>
                      <button
                        className="btn btn-edit"
                        onClick={() => handleEdit(el)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-delete"
                        onClick={() => handleDelete(el._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" style={{ textAlign: "center" }}>
                    No Data
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default App;
