// css
import { Nav, Navbar, Container } from 'react-bootstrap';

function RenderNavbar() {
  return (
    <Navbar className="nav-bar" variant="dark" expand="sm">
      <Container className="navItem mx-5">
        <Navbar.Brand href="/">GlobalSpend</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
      </Container>
      <Container className="text-right">
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/transaction/">Transactions</Nav.Link>
            <Nav.Link href="/envelope/">Envelopes</Nav.Link>
            <Nav.Link href="/store/">Stores</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
};

export default RenderNavbar;