import React from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_STUDENTS } from "../../graphql/query";
import { myContext } from "../../context/NewPostContext";
import {
  Checkbox,
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";

const StudentModal = () => {
  const { data, loading } = useQuery(GET_ALL_STUDENTS);
  const { studentModal, handleStudentModal } = React.useContext(myContext);
  // eslint-disable-next-line no-unused-vars
  const [selectedValue, setSelectedValue] = React.useState(null);
  console.log(data);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  const users = data?.getStudentUsers;
  function handlePowerUser(e) {}

  return (
    <>
      <Dialog onClose={handleStudentModal} open={studentModal} fullWidth={true}>
        <DialogTitle>
          Power Up User
          <button
            type="button"
            className="btn btn btn-outline-info ml-6"
            onClick={handlePowerUser}
          >
            Power Up!
          </button>
        </DialogTitle>
        <List sx={{ pt: 0 }}>
          {users?.map((user) => (
            <ListItem button key={user?.id}>
              <ListItemAvatar>
                <Checkbox
                  onChange={(e) => {
                    e.preventDefault();
                    console.log(user?.id);
                    setSelectedValue(user?.id);
                  }}
                />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <>
                    <h1>{user?.id}</h1>
                  </>
                }
              />
            </ListItem>
          ))}
        </List>
      </Dialog>
    </>
  );
};

export default StudentModal;
