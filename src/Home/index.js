import { Col, Container, Row } from "reactstrap"
import { Link } from "react-router-dom"

export const Home = () => {
    return (
            <Container>
                <Col>
                    <div className="d-flex">
                        <div className="m-auto p-4">
                            <h1>Página Inicial</h1>
                        </div>
                        </div>
                </Col>
                <Row className="p-5">
                    <Col>
                        <div>
                            <Link to="/listar-clientes"
                                className="m-auto btn btn-outline-primary btn-lg">Clientes</Link>
                        </div>
                    </Col>
                    <Col>
                        <div>
                            <Link to="/listar-empresas"
                                className="m-auto btn btn-outline-primary btn-lg">Empresas</Link>
                        </div>
                    </Col>
                </Row>
            </Container>
    )
}