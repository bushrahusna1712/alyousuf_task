import React, { useEffect, useState } from "react";
import { OutTable, ExcelRenderer } from "react-excel-renderer";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Table } from "antd";

import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import Select from "../../components/Select/Select";
import Checkbox from "../../components/Checkbox/Checkbox";
import Record from "../../components/Record/Record";

import "./style.css";

const columns = [
  {
    title: "Title",
    dataIndex: "title",
  },
  {
    title: "Division",
    dataIndex: "division",
  },
  {
    title: "Date",
    dataIndex: "date",
  },
  {
    title: "Notes",
    dataIndex: "notes",
  },
  {
    title: "Bunting",
    dataIndex: "bunting",
  },
];

function Home() {
  const location = useLocation();
  const navigate = useNavigate();

  const [division, setDivision] = useState("");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");
  const [bunting, setBunting] = useState(false);
  const [showMyData, setShowMyData] = useState(false);
  const [records, setRecords] = useState([]);
  const [excelRecords, setExcelRecords] = useState(null);
  const [fileInput, setFileInput] = useState(Date.now());
  const [addNewDivi, setAddNewDivi] = useState(false);
  const [diviName, setDiviName] = useState("");
  const [divisions, setDivisions] = useState([]);

  useEffect(() => {
    if (!location.state?.id) {
      navigate("/");
    } else if (!Boolean(divisions.length)) {
      fetchDivisions();
    }
  }, []);

  useEffect(() => {
    if (showMyData) {
      fetchRecords();
    }
  }, [showMyData]);

  const fetchRecords = async () => {
    try {
      const { data } = await axios.post(`${process.env.REACT_APP_API_URL}records/getRecords`, {
        user: location.state?.id,
      });
      if (data.data?.records) {
        setRecords(data.data.records);
      } else {
        toast.error(`${data.data?.message}`);
      }
    } catch (error) {
      toast.error(JSON.stringify(error));
    }
  };

  const fetchDivisions = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API_URL}divisions/getDivisions`);
      if (data.data?.divisions) {
        const divs = [];
        data.data.divisions.forEach((div) => {
          divs.push({ value: div.division });
        });
        setDivisions(divs);
      } else {
        toast.error(`${data.data?.message}`);
      }
    } catch (error) {
      toast.error(JSON.stringify(error));
    }
  };

  const fileHandler = (event) => {
    let fileObj = event.target.files[0];

    ExcelRenderer(fileObj, (err, resp) => {
      if (err) {
        console.log(err);
      } else {
        resp.rows.splice(0, 1);
        const data = [];
        resp.rows?.forEach((item, idx) => {
          data.push({
            key: idx + 1,
            division: item[0],
            title: item[1],
            date: item[2],
            notes: item[3],
            bunting: item[4] ? "True" : "False",
          });
        });
        setExcelRecords(data);
      }
    });
  };

  const handleRemoteData = async () => {
    try {
      const { data } = await axios.get('https://www.gov.uk/bank-holidays.json')
      toast.success('Data fetched successfully.')
      if (data && Boolean(Object.keys(data).length)) {
        const resData = []
        Object.keys(data).forEach(itm => {
          data[itm]?.events?.forEach((item, idx) => {
            resData.push({
              ...item,
              division: data[itm]?.division,
              bunting: item.bunting ? 'True' : 'False',
              key: idx + 1,
            })
          })
        })
        setExcelRecords(resData)
      }
    } catch (error) {
      toast.error(JSON.stringify(error))
    }
  }

  const handleUpload = async () => {
    const data = [];
    if (!!excelRecords) {
      excelRecords.forEach((rec) => {
        delete rec.key;
        data.push({
          ...rec,
          bunting: rec.bunting === "True",
          user: location.state?.id,
        });
      });
    } else {
      data.push({
        user: location.state?.id,
        division,
        title,
        date,
        notes,
        bunting,
      });
    }
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}records/createRecord`, { data });
      toast.success("Record created successfully");
      if (!!excelRecords) {
        handleRemove()
      } else {
        setDivision("");
        setTitle("");
        setDate("");
        setNotes("");
        setBunting(false);
      }
    } catch (error) {
      toast.error(error?.response?.data?.data?.message || JSON.stringify(error));
    }
  };

  const handleRemove = () => {
    setFileInput(Date.now());
    setExcelRecords(null);
  };

  const handleAddDivi = async () => {
    if (!diviName) {
      return toast.error('Please enter a division')
    }
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}divisions/createDivision`, {
        division: diviName,
      });
      toast.success("Division added.");
      setDiviName('')
      const { data } = await axios.get(`${process.env.REACT_APP_API_URL}divisions/getDivisions`);
      if (data.data?.divisions) {
        const divs = [];
        data.data.divisions.forEach((div) => {
          divs.push({ value: div.division });
        });
        setDivisions(divs);
      } else {
        toast.error(`${data.data?.message}`);
      }
      setAddNewDivi(false);
    } catch (error) {
      toast.error(JSON.stringify(error));
    }
  };

  const deleteRecord = async (id) => {
    try {
      const { data } = await axios.post(`${process.env.REACT_APP_API_URL}records/deleteRecord`, { id })
      toast.success(data.data?.message)
      fetchRecords()
    } catch (error) {
      toast.error(JSON.stringify(error));
    }
  }

  return (
    <div>
      <ToastContainer />
      <div className="home_header">
        <p>
          Welcome,&nbsp;<strong>{location.state?.user || "User"}</strong>
        </p>
        <Button label="Logout" ternary flex={0} onClick={() => navigate("/")} />
      </div>
      <div className="home_main">
        <div className="home_data_btns">
          <Button label="My Data" secondary={!showMyData} onClick={() => setShowMyData(true)} />
          <Button label="Add New Data" secondary={showMyData} onClick={() => setShowMyData(false)} />
        </div>
        <hr />
        {showMyData && (
          <div>
            {Boolean(records.length) ? (
              <div className="record_wrapper">
                {records.map((rec) => (
                  <Record key={rec._id} record={rec} onClick={deleteRecord} />
                ))}
              </div>
            ) : (
              <div>
                <p>No records found...</p>
              </div>
            )}
          </div>
        )}
        {!showMyData && (
          <div className="home_add_new">
            <div className="home_excel_optns">
              <div>
                <h3>Upload Excel</h3>
                <input type="file" onChange={fileHandler} key={fileInput} style={{ padding: "10px 0" }} />
              </div>
              <div>
                <Button label="Fetch from remote" secondary onClick={handleRemoteData} />
              </div>
            </div>
            {!!excelRecords && (
              <>
                <Table columns={columns} dataSource={excelRecords} size="small" />
                <div className="home_upload_btns">
                  <Button label="Upload" onClick={handleUpload} />
                  <Button label="Remove" ternary onClick={handleRemove} />
                </div>
              </>
            )}
            {!excelRecords && (
              <>
                <div className="home_or">
                  <span className="home_or_span" />
                  <p>OR</p>
                  <span className="home_or_span" />
                </div>
                <div className="home_new_division">
                  <div className="home_new_division_add_new">
                    <Button label="Add New Division" ternary flex={0} onClick={() => setAddNewDivi(true)} />
                  </div>
                  <div>
                    {addNewDivi && (
                      <>
                        <Input placeholder="Division Name" value={diviName} setValue={setDiviName} />
                        <div className="home_new_division_add_new">
                          <Button label="Add" onClick={handleAddDivi} flex={0} />
                          <Button label="Cancel" secondary onClick={() => setAddNewDivi(false)} flex={0} />
                        </div>
                      </>
                    )}
                  </div>
                </div>
                <Select value={division} setValue={setDivision} options={divisions} />
                <Input placeholder="Title" value={title} setValue={setTitle} />
                <Input placeholder="Date" type="date" value={date} setValue={setDate} />
                <Input placeholder="Notes" value={notes} setValue={setNotes} />
                <Checkbox value={bunting} onClick={setBunting} />
                <Button label="Submit" onClick={handleUpload} />
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
