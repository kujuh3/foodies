import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { BiSearch } from "react-icons/bi";
import { useState, useEffect } from "react";

type SearchFieldProps = {
  change: Function;
  defaultWord?: string;
};

const SearchBar = ({ change, defaultWord }: SearchFieldProps) => {
  const [input, setInput] = useState("");
  const [firstLoad, setFirstload] = useState(true);
  //Since this search bar will be used for fetches, we'll set a timeout of 600ms so that we don't do fetches every damn nanosecond.
  useEffect(() => {
    if (!firstLoad) {
      const timeout = setTimeout(() => {
        change(input);
      }, 600);
      return () => {
        clearTimeout(timeout);
      };
    } else {
      setFirstload(!firstLoad);
    }
  }, [input]);

  return (
    <>
      <TextField
        defaultValue={defaultWord ? defaultWord : null}
        onChange={(e) => {
          setInput(e.target.value);
        }}
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <BiSearch />
            </InputAdornment>
          ),
        }}
      />
    </>
  );
};

export default SearchBar;
