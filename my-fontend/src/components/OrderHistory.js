import { useState } from "react";
import { Container, Pagination, Typography, List, ListItem, ListItemText } from "@mui/material";

const items = Array.from({ length: 50 }, (_, i) => `Item ${i + 1}`); // Giả lập danh sách 50 mục

export default function OrderHistory() {
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  const handleChange = (event, value) => {
    setPage(value);
  };

  const startIndex = (page - 1) * itemsPerPage;
  const displayedItems = items.slice(startIndex, startIndex + itemsPerPage);

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Pagination Example
      </Typography>
      <List>
        {displayedItems.map((item, index) => (
          <ListItem key={index}>
            <ListItemText primary={item} />
          </ListItem>
        ))}
      </List>
      <Pagination
        count={Math.ceil(items.length / itemsPerPage)}
        page={page}
        onChange={handleChange}
        color="primary"
        sx={{ mt: 2, display: "flex", justifyContent: "center" }}
      />
    </Container>
  );
}
