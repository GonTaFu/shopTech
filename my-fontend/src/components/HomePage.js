import { Box, Container, Typography, Button, Card, CardContent, CardMedia } from "@mui/material";
import Grid from "@mui/material/Grid2";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const products = [
  { id: 1, name: "Laptop Gaming", price: "$1200", image: "/laptop.jpg" },
  { id: 2, name: "Smartphone", price: "$800", image: "/phone.jpg" },
  { id: 3, name: "Tai nghe Bluetooth", price: "$150", image: "/headphones.jpg" },
  { id: 4, name: "Tai nghe Bluetooth", price: "$150", image: "/headphones.jpg" },
  { id: 5, name: "Tai nghe Bluetooth", price: "$150", image: "/headphones.jpg" },
  { id: 6, name: "Tai nghe Bluetooth", price: "$150", image: "/headphones.jpg" },
  { id: 7, name: "Tai nghe Bluetooth", price: "$150", image: "/headphones.jpg" },
  { id: 8, name: "Tai nghe Bluetooth", price: "$150", image: "/headphones.jpg" },
  { id: 9, name: "Tai nghe Bluetooth", price: "$150", image: "/headphones.jpg" },
];

export default function HomePage() {
  return (
    <Container>
      {/* Hero Section */}
      <Box textAlign="center" my={4}>
        <Typography variant="h3" fontWeight="bold">
          Chào mừng đến với Shop Online
        </Typography>
        <Typography variant="h6" color="textSecondary" mt={2}>
          Tìm kiếm và mua sắm sản phẩm yêu thích của bạn ngay hôm nay!
        </Typography>
        <Button variant="contained" color="primary" size="large" sx={{ mt: 3 }} startIcon={<ShoppingCartIcon />}>
          Mua ngay
        </Button>
      </Box>

      {/* Danh mục sản phẩm */}
      <Typography variant="h4" mt={4} mb={2} textAlign="center">
        Sản phẩm nổi bật
      </Typography>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 1, sm: 8, md: 12 }}>
        {products.map((product) => (
          <Grid item key={product.id} size={{ xs: 2, sm: 4, md: 4 }}>
            <Card>
              <CardMedia component="img" height="200" image={product.image} alt={product.name} />
              <CardContent>
                <Typography variant="h6">{product.name}</Typography>
                <Typography color="textSecondary">{product.price}</Typography>
                <Button size="small" variant="outlined" sx={{ mt: 1 }}>
                  Thêm vào giỏ
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
