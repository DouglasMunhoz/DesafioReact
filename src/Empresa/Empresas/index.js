import axios from "axios"
import { useEffect, useState } from "react"
import { api } from "../../config"
import { Alert, Container, Table, } from "reactstrap"
import { Link } from "react-router-dom"

export const Empresas = () => {
    const [data, setData] = useState([])
    const [status, setStatus] = useState({
        type: '',
        message: ''
    })

    const getEmpresas = async () => {
        await axios.get(api + "/empresa/listar")
            .then((response) => {
                console.log(response.data.emp)
                setData(response.data.emp)
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: Sem conexão com a API'
                })
                console.log("Sem conexão com a API.")
            })

    }

    useEffect(() => {
        getEmpresas();
    }, [])

    const delEmpresa = async (id) => {
        console.log(id)

        const headers = {
            'Content-type': 'application/json'
        }

        await axios.delete(api + "/empresa/" + id,
            { headers })
            .then((response) => {
                console.log(response.data.type);
                console.log(response.data.message)
                getEmpresas()
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: Impossivel conectar com a API.'
                })
            })
    }


    return (
        <div>
            <Container>
                <div className="p-2">
                    {status.type === 'error' ?
                        <Alert color="danger">{status.message}</Alert> : ""}
                </div>
                <div className="d-flex">
                    <div>
                        <h1>Lista de Empresas</h1>
                    </div>
                    <div className="p-2 m-auto">
                        <Link to="/novo-empresa" className="btn btn-outline-info btn-sm">Inserir Empresa</Link>
                    </div>
                </div>

                <Table striped>
                    <thead>
                        <tr>
                            <th> Id </th>
                            <th> Nome </th>
                            <th> Data de Adesao </th>
                            <th> Data do Cadastro </th>
                            <th> Ações </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(emp => (
                            <tr key={emp.id}>
                                <th scope="row">{emp.id}</th>
                                <td> {emp.nome} </td>
                                <td> {emp.dataAdesao} </td>
                                <td> {emp.createdAt} </td>
                                <td>
                                    <Link to={"/empresa/" + emp.id + "/promocoes"}
                                        className="m-1 btn btn-outline-info btn-sm">Promoções</Link>
                                    <span className="m-1 btn btn-outline-danger btn-sm"
                                        onClick={() => delEmpresa(emp.id)}>Excluir</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    )
}