import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../assets/PITAKA.png';


function Header() {
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home"><img style={{ height: "60px", width: "60px" }} src={logo} alt="logo" /></Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/Homepage">Dashboard</Nav.Link>
            <Nav.Link href="/HistoryPage">Transactions</Nav.Link>
            <Nav.Link href="/Account">Account</Nav.Link>
            <Nav.Link href="/">Logout</Nav.Link>

          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;