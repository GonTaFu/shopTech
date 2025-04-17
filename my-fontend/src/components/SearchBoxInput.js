'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Box, FormControl, Input, InputAdornment, IconButton } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

const SearchBoxInput = () => {
  const [keyWord, setkeyWord] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    router.push(`/products/search?q=${encodeURIComponent(keyWord)}`);
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', m: 1, width: '100%', maxWidth: 600, marginLeft: "2%" }}>
      <FormControl fullWidth sx={{ m: 1 }} variant="standard">
        <Input
              id="standard-adornment-amount"
              value={keyWord}
              onChange={(e) => {setkeyWord(e.target.value)}}
              onKeyDown={(event) => {
                console.log(`Pressed keyCode ${event.key}`);
                if (event.key === 'Enter') {
                  handleSearch();
                }
              }}
            
              startAdornment={<InputAdornment position="start">Searching..</InputAdornment>}
        />
      </FormControl>
      <IconButton onClick={handleSearch} variant="contained" sx={{ ml: 2, marginLeft: 0}}>
        <SearchIcon/>
      </IconButton>
    </Box>
  );
}

export default SearchBoxInput;