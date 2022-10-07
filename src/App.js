import './App.css';
import {Routes, Route} from 'react-router-dom';
import { Home } from './Home';
import { Clientes } from './Cliente/Clientes';
import { Menu } from './Menu';
import { CadastrarCliente } from './Cliente/CadastrarCliente';
import { CartoesCliente } from './Cliente/CartoesCliente';
import { EditarCartao } from './Cliente/EditarCartao';
import { ComprasCartao } from './Cliente/ComprasCartao';
import { EditarCompra } from './Cliente/EditarCompra';
import { CadastrarCartao } from './Cliente/CadastrarCartao';
import { CadastrarCompra } from './Cliente/CadastrarCompra';
import { Empresas } from './Empresa/Empresas';
import { CadastrarEmpresa } from './Empresa/CadastrarEmpresa';
import { Promocoes } from './Empresa/Promocoes';
import { CadastrarPromocao } from './Empresa/CadastrarPromocao';

function App() {
  return (
    <div className="App">
      <Menu/>
      <Routes> 
        <Route path = '/' element={<Home/>}/>
        <Route path = '/listar-clientes' element={<Clientes/>}/>
        <Route path = '/novo-cliente' element={<CadastrarCliente/>}/>
        <Route path = '/cartoes-cliente/:id' element={<CartoesCliente/>}/>
        <Route path = '/editar-cartao/:id' element={<EditarCartao/>}/>
        <Route path = '/compra-cartao/:id' element={<ComprasCartao/>}/>
        <Route path = '/editar-compra/:id/:id' element={<EditarCompra/>}/>
        <Route path = '/novo-cartao/:id' element={<CadastrarCartao/>}/>
        <Route path = '/cadastrar-compra/:id' element={<CadastrarCompra/>}/>
        <Route path = '/listar-empresas' element={<Empresas/>}/>
        <Route path = '/novo-empresa' element={<CadastrarEmpresa/>}/>
        <Route path = '/empresa/:id/promocoes' element={<Promocoes/>}/>
        <Route path = '/empresa/:id/promocao' element={<CadastrarPromocao/>}/>
      </Routes>
    </div>
  );
}

export default App;
