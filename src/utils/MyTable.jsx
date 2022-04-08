import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import { Link } from "react-router-dom";
import { role } from "../config";
import FileCopyRoundedIcon from "@material-ui/icons/FileCopyRounded";
import MyIcons from "./MyIcons";

const useStyles = makeStyles({
  root: {
    minWidth: '50vw',
    maxWidth: '1500px',
    // background:
    //   "linear-gradient(-135deg, rgba(255, 255, 255, .5) 60%,  rgba(255, 255, 255, .0))",
    background: '#58A5F0',
    borderRadius: "5px",
    boxShadow:
      "2px 2px 0px 0px rgba(255, 255, 255, .1), 2px 2px 0px 0px rgba(255, 255, 255, .1)",
    "& th": {
      fontFamily: "'Roboto', sans-serif !important",
      color: "#F5F5F6 !important",
      borderColor: "#F5F5F6",
    },

    "& td": {
      fontFamily: "'Roboto', sans-serif !important",
      color: "rgba(0, 0, 0, 0.5) !important",
      borderColor: "#F5F5F6",
    },
    "& tbody tr": {
      transition: "all 0.3s",
      "&:hover": {
        // background:
        //   "linear-gradient(135deg, rgba(255, 255, 255, .5) 60%,  rgba(255, 255, 255, .0))",
        background: '#58A5F0',
        cursor: "pointer",
      },
    },
    //  width
    "&::-webkit-scrollbar": {
      height: "10px",
      width: "10px",
    },
    //  Track
    "&::-webkit-scrollbar-track": {
      background: "#F5F5F6",
    },
    //  Handle
    "&::-webkit-scrollbar-button": {
      background: "#edecec",
    },
    //  Handle on hover
    "&::-webkit-scrollbar-thumb": {
      background: "#a3a1a1",
      borderRadius: "10px",
    },
  },
  checkbox: {
    color: "#F5F5F6",
    "&.Mui-checked": {
      color: "#F5F5F6 !important",
    },
  },
  string: {
    maxHeight: '62px',
    overflow: 'hidden',
    display: 'block'
  }
});

export default function MyTable(props) {
  const classes = useStyles();

  const isChecked = (index) => {
    return !!(props.checking.findIndex((el) => el == index) + 1);
  };

  const checking = (index) => {
    const newArray = [...props.checking];

    if (!props.checking.length) {
      newArray.push(index);
    } else {
      let ind = props.checking.findIndex((el) => el == index);

      if (ind + 1) {
        newArray.splice(ind, 1);
      } else {
        newArray.push(index);
      }
    }

    props.setChecking(newArray);
  };

  const checkingAll = () => {
    let newArray = [...props.checking];
    if (props.data.length === props.checking.length) {
      newArray = [];
    } else {
      newArray = [];
      props.data.forEach((element, index) => {
        newArray.push(index);
      });
    }
    props.setChecking(newArray);
  };

  const onCopy = (event, text) => {
    event.stopPropagation();
    navigator.clipboard.writeText(`${document.location.origin}${text}`);
  };

  return (
    <TableContainer className={classes.root} component={Paper}>
      <Table size="small" aria-label="a dense table">
        {/* TableHead  */}
        <TableHead>
          <TableRow>
            {props.isChecked && (
              <TableCell padding="checkbox">
                <Checkbox
                  className={classes.checkbox}
                  onChange={checkingAll}
                  indeterminate={
                    props.checking.length > 0 &&
                    props.checking.length < props.data.length
                  }
                  checked={
                    props.data.length > 0 &&
                    props.data.length === props.checking.length
                  }
                />
              </TableCell>
            )}
            {props.headers.map((el, index) => (
              <TableCell key={index}>{props.headersName[index]}</TableCell>
            ))}
          </TableRow>
        </TableHead>

        {/* TableBody  */}
        <TableBody>
          {props.data.map((row, index) => (
            <TableRow
              key={index}
              onClick={() => props.isChecked && checking(index)}
            >
              {props.isChecked && (
                <TableCell padding="checkbox">
                  <Checkbox
                    className={classes.checkbox}
                    checked={isChecked(index)}
                  />
                </TableCell>
              )}
              {props.headers.map((el, index) => (

                // type = [number, string, date, role, phone, link, array]
                <>
                  {
                    {
                      number: <TableCell key={index}>{row[el.name]}</TableCell>,
                      string: <TableCell key={index}>
                        <span className={classes.string}>{row[el.name]}</span>
                        </TableCell>,
                      date: (
                        <TableCell key={index}>
                          {row[el.name] && new Date(row[el.name]).toLocaleString()}
                        </TableCell>
                      ),
                      role: (
                        <TableCell key={index}>{role[row[el.name]]?.ru}</TableCell>
                      ),
                      phone: <TableCell key={index}>{row[el.name]}</TableCell>,
                      link: (
                        <TableCell key={index}>
                          {row[el.name] ? (
                            <div style={{ display: "flex" }}>
                              <Link
                                to={row[el.name]}
                                style={{
                                  maxWidth: "200px",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  paddingRight: "10px",
                                }}
                              >
                                {row[el.name]}
                              </Link>
                              <MyIcons click={(event) => onCopy(event, row[el.name])}>
                                <FileCopyRoundedIcon />
                              </MyIcons>
                            </div>
                          ): ''}
                        </TableCell>
                      ),
                      array: <TableCell key={index}>
                      <span className={classes.string}>{row[el.name]?.length}</span>
                      </TableCell>,
                    }[el.type]
                  }
                </>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
