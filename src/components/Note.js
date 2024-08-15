import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Grid, TextField } from "@mui/material";
import "./Note.css";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import DeleteIcon from "@mui/icons-material/Delete";
import { Troubleshoot } from "@mui/icons-material";
export const Note = () => {
  const [arr, setArr] = useState(() => {
    return JSON.parse(localStorage.getItem("arr")) || [];
  });
  const [filterArr, setFilterArr] = useState();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [search, setSearch] = useState("");
  const [mode, setMode] = useState(false);

  const deleteNote = (deleteOne) => {
    return setArr(arr.filter((e) => e.title !== deleteOne));
  };

  const searchNotes = () => {
    const searchFilter = arr.filter((e) => e.title === search);
    const notSearchFilter = arr.filter((e) => e.title !== search);
    if (search !== "") {
      setFilterArr(searchFilter);
    } else {
      setArr(notSearchFilter);
    }
  };

  const addNotes = () => {
    if (title.trim() !== "" && content.trim() !== "") {
      setArr([
        ...arr,
        {
          title: title,
          content: content,
          timeStamp: Date().toString().slice(0, 25),
          timeLine: Date.now(),
        },
      ]);
      setTitle("");
      setContent("");
    }
  };
  useEffect(() => {
    localStorage.setItem("arr", JSON.stringify(arr));
  }, [arr]);

  return (
    <div
      className={mode ? "container bg-dark text-white" : "container"}
      style={{ minHeight: 500 }}
    >
      <div
        className={
          mode
            ? "d-flex justify-content-space-between align-items-center bg-dark text-white"
            : "d-flex justify-content-space-between align-items-center"
        }
      >
        <h1>Notes.</h1>
        <div className="ms-auto">
          {mode ? (
            <DarkModeIcon onClick={() => setMode(false)} />
          ) : (
            <LightModeIcon onClick={() => setMode(true)} />
          )}{" "}
        </div>
      </div>
      <Grid container>
        <Grid item xs={0.8} lg={0.3} className="grid-search">
          <SearchIcon
            className={mode ? "text-dark" : "text-dark"}
            onClick={searchNotes}
          />
        </Grid>
        <Grid item xs={11.2} lg={11.7} className="grid-input">
          <input
            type="text"
            placeHolder="Type to Search.."
            className="w-100 input-style"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(event) => event.key === "Enter" && searchNotes()}
          />
        </Grid>
      </Grid>
      <br />
      <br />
      <Grid container spacing={2}>
        <Grid item>
          <Card sx={{ minWidth: 345, backgroundColor: "#50b7ab" }}>
            <CardContent>
              <input
                type="text"
                placeHolder="type the Note Title ..."
                className="w-100 input-style-card"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <br />
              <br />
              <TextField
                id="standard-multiline-static"
                label=""
                placeholder="type the Note topic ..."
                multiline
                rows={4}
                variant="standard"
                sx={{ width: "100%" }}
                className="focus-input"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </CardContent>
            <CardActions>
              <Button size="small" className="ms-auto" onClick={addNotes}>
                Save
              </Button>
            </CardActions>
          </Card>
        </Grid>
        {search === ""
          ? arr
              ?.sort((a, b) => b.timeLine - a.timeLine)
              .map((e) => {
                return (
                  <>
                    <Grid item>
                      <Card
                        sx={{
                          width: 345,
                          backgroundColor: "#fbc115",
                          borderRadius: 3,
                          height: 230,
                        }}
                        className={mode ? "text-white" : "text-dark"}
                      >
                        <CardContent>
                          <Typography gutterBottom variant="h4" component="div">
                            {e.title}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            className={mode ? "text-white" : "text-dark"}
                          >
                            {e.content}
                          </Typography>
                        </CardContent>
                        <CardActions>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            className={mode ? "text-white" : "text-dark"}
                          >
                            {e.timeStamp}
                          </Typography>

                          <Button
                            className="ms-auto"
                            size="small"
                            onClick={() => deleteNote(e.title)}
                          >
                            <DeleteIcon className="text-danger" />
                          </Button>
                        </CardActions>
                      </Card>
                    </Grid>
                  </>
                );
              })
          : filterArr
              ?.sort((a, b) => b.timeLine - a.timeLine)
              .map((e) => {
                return (
                  <>
                    <Grid item>
                      <Card
                        sx={{
                          width: 345,
                          backgroundColor: "#fbc115",
                          borderRadius: 3,
                          height: 230,
                        }}
                        className={mode ? "text-white" : "text-dark"}
                      >
                        <CardContent>
                          <Typography gutterBottom variant="h4" component="div">
                            {e.title}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            className={mode ? "text-white" : "text-dark"}
                          >
                            {e.content}
                          </Typography>
                        </CardContent>
                        <CardActions>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            className={mode ? "text-white" : "text-dark"}
                          >
                            {e.timeStamp}
                          </Typography>

                          <Button
                            className="ms-auto"
                            size="small"
                            onClick={() => deleteNote(e.title)}
                          >
                            Delete
                          </Button>
                        </CardActions>
                      </Card>
                    </Grid>
                  </>
                );
              })}
      </Grid>
    </div>
  );
};
