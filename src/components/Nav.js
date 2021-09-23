import React from 'react';
import '../App.css';
import * as ReactBoostrap from 'react-bootstrap';

function Nav(props) {

    const hideNotificacion = false;//NO ESTA ESCONDIDO EN FALSE Y EN TRUE SI ESTA ESCONDIDO
    const hideTarea = false;
    const hideAgendarServicio = false;
    const hideEmpleado = false;
    const hideProveedor = false;
    const hideUsuario = false;
    const hideServicio = false;
    const hideProducto = false;
    const hideCategoria = false;
    const hidePerfil = false;
    const hideEstado = false;

    if (localStorage.getItem("perfil") === "Cliente") {
        return (
            <div>
                <ReactBoostrap.Navbar className='fixed-top' collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <ReactBoostrap.Navbar.Brand href="/PantallaPrincipal">Car Clean</ReactBoostrap.Navbar.Brand>
                    <ReactBoostrap.Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <ReactBoostrap.Navbar.Collapse id="responsive-navbar-nav">
                        <ReactBoostrap.Nav className="mr-auto">
                            <ReactBoostrap.NavDropdown title="Notificacion" id="collasible-nav-dropdown" hidden={hideNotificacion}>
                                <ReactBoostrap.NavDropdown.Divider />
                                <ReactBoostrap.NavDropdown.Item href="/ListarNotificacionesUsuario" >Listar Notificaciones Usuario</ReactBoostrap.NavDropdown.Item>
                            </ReactBoostrap.NavDropdown>
                            <ReactBoostrap.NavDropdown title="Agenda" id="collasible-nav-dropdown" hidden={hideAgendarServicio}>
                                <ReactBoostrap.NavDropdown.Divider />
                                <ReactBoostrap.NavDropdown.Item href="/AgendarServicio" >Agendar Servicio
                                </ReactBoostrap.NavDropdown.Item>
                            </ReactBoostrap.NavDropdown>
                        </ReactBoostrap.Nav>
                        <ReactBoostrap.Nav>
                            <ReactBoostrap.Nav.Link href="/Logout">Logout</ReactBoostrap.Nav.Link>
                        </ReactBoostrap.Nav>
                    </ReactBoostrap.Navbar.Collapse>
                </ReactBoostrap.Navbar>
            </div>);

    } else if (localStorage.getItem("perfil") === "Empleado") {
        return (
            <div>
                <ReactBoostrap.Navbar className='fixed-top' collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <ReactBoostrap.Navbar.Brand href="/PantallaPrincipal">Car Clean</ReactBoostrap.Navbar.Brand>
                    <ReactBoostrap.Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <ReactBoostrap.Navbar.Collapse id="responsive-navbar-nav">
                        <ReactBoostrap.Nav className="mr-auto">

                            <ReactBoostrap.NavDropdown title="Notificacion" id="collasible-nav-dropdown" hidden={hideNotificacion}>
                                <ReactBoostrap.NavDropdown.Divider />
                                <ReactBoostrap.NavDropdown.Item href="/ListarNotificacionesUsuario" >Crear Notificaciones Usuario</ReactBoostrap.NavDropdown.Item>
                            </ReactBoostrap.NavDropdown>

                            <ReactBoostrap.NavDropdown title="Tarea" id="collasible-nav-dropdown" hidden={hideTarea}>
                                <ReactBoostrap.NavDropdown.Divider />
                                <ReactBoostrap.NavDropdown.Item href="/CrearTarea" >Crear Tarea</ReactBoostrap.NavDropdown.Item>
                                <ReactBoostrap.NavDropdown.Divider />
                                <ReactBoostrap.NavDropdown.Item href="/ListarTareas" >Listar Tareas</ReactBoostrap.NavDropdown.Item>
                            </ReactBoostrap.NavDropdown>

                            <ReactBoostrap.NavDropdown title="Agenda" id="collasible-nav-dropdown" hidden={hideAgendarServicio}>
                                <ReactBoostrap.NavDropdown.Item href="/ListarAgenda" >Listar Agenda</ReactBoostrap.NavDropdown.Item>
                                <ReactBoostrap.NavDropdown.Divider />
                                <ReactBoostrap.NavDropdown.Item href="/BorrarAgendaServicio" >Borrar Agenda Servicio</ReactBoostrap.NavDropdown.Item>
                            </ReactBoostrap.NavDropdown>


                            <ReactBoostrap.NavDropdown title="Producto" id="collasible-nav-dropdown" hidden={hideProducto}>
                                <ReactBoostrap.NavDropdown.Divider />
                                <ReactBoostrap.NavDropdown.Item href="/CrearProducto" >Crear Producto</ReactBoostrap.NavDropdown.Item>
                                <ReactBoostrap.NavDropdown.Divider />
                                <ReactBoostrap.NavDropdown.Item href="/ListarProductos" >Listar Productos</ReactBoostrap.NavDropdown.Item>
                                <ReactBoostrap.NavDropdown.Divider />
                                <ReactBoostrap.NavDropdown.Item href="/BorrarProducto" >Acciones Producto</ReactBoostrap.NavDropdown.Item>
                            </ReactBoostrap.NavDropdown>

                            <ReactBoostrap.NavDropdown title="Garantia" id="collasible-nav-dropdown">
                                <ReactBoostrap.NavDropdown.Divider />
                                <ReactBoostrap.NavDropdown.Item href="/CrearGarantia" >Crear Garantía</ReactBoostrap.NavDropdown.Item>
                                <ReactBoostrap.NavDropdown.Divider />
                                <ReactBoostrap.NavDropdown.Item href="/BorrarGarantia" >Borrar Garantía</ReactBoostrap.NavDropdown.Item>
                                <ReactBoostrap.NavDropdown.Divider />
                                <ReactBoostrap.NavDropdown.Item href="/ListarGarantia" >Listar Garantía</ReactBoostrap.NavDropdown.Item>
                            </ReactBoostrap.NavDropdown>

                        </ReactBoostrap.Nav>
                        <ReactBoostrap.Nav>
                            <ReactBoostrap.Nav.Link href="/Logout">Logout</ReactBoostrap.Nav.Link>
                        </ReactBoostrap.Nav>
                    </ReactBoostrap.Navbar.Collapse>
                </ReactBoostrap.Navbar>
            </div>

        );
    } else if (localStorage.getItem("perfil") ==="Admin") {
        return (
            <div>
                <ReactBoostrap.Navbar className='fixed-top' collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <ReactBoostrap.Navbar.Brand href="/PantallaPrincipal">Car Clean</ReactBoostrap.Navbar.Brand>
                    <ReactBoostrap.Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <ReactBoostrap.Navbar.Collapse id="responsive-navbar-nav">
                        <ReactBoostrap.Nav className="mr-auto">

                            <ReactBoostrap.NavDropdown title="Notificacion" id="collasible-nav-dropdown" hidden={hideNotificacion}>
                                <ReactBoostrap.NavDropdown.Divider />
                                <ReactBoostrap.NavDropdown.Item href="/ListarNotificacionesUsuario" >Listar Notificaciones Usuario</ReactBoostrap.NavDropdown.Item>
                            </ReactBoostrap.NavDropdown>

                            <ReactBoostrap.NavDropdown title="Tarea" id="collasible-nav-dropdown" hidden={hideTarea}>
                                <ReactBoostrap.NavDropdown.Divider />
                                <ReactBoostrap.NavDropdown.Item href="/CrearTarea" >Crear Tarea</ReactBoostrap.NavDropdown.Item>
                                <ReactBoostrap.NavDropdown.Divider />
                                <ReactBoostrap.NavDropdown.Item href="/BorrarTarea" >Borrar Tarea</ReactBoostrap.NavDropdown.Item>
                                <ReactBoostrap.NavDropdown.Divider />
                                <ReactBoostrap.NavDropdown.Item href="/ListarTareas" >Listar Tareas</ReactBoostrap.NavDropdown.Item>
                            </ReactBoostrap.NavDropdown>

                            <ReactBoostrap.NavDropdown title="Agenda" id="collasible-nav-dropdown" hidden={hideAgendarServicio}>
                                <ReactBoostrap.NavDropdown.Divider />
                                <ReactBoostrap.NavDropdown.Item href="/AgendarServicio" >Agendar Servicio
                                </ReactBoostrap.NavDropdown.Item>
                                <ReactBoostrap.NavDropdown.Divider />
                                <ReactBoostrap.NavDropdown.Item href="/ListarAgenda" >Listar Agenda</ReactBoostrap.NavDropdown.Item>
                                <ReactBoostrap.NavDropdown.Divider />
                                <ReactBoostrap.NavDropdown.Item href="/BorrarAgendaServicio" >Borrar Agenda Servicio</ReactBoostrap.NavDropdown.Item>
                            </ReactBoostrap.NavDropdown>

                            <ReactBoostrap.NavDropdown title="Empleado" id="collasible-nav-dropdown" hidden={hideEmpleado}>
                                <ReactBoostrap.NavDropdown.Divider />
                                <ReactBoostrap.NavDropdown.Item href="/CrearEmpleado" >Crear Empleado</ReactBoostrap.NavDropdown.Item>
                                <ReactBoostrap.NavDropdown.Divider />
                                <ReactBoostrap.NavDropdown.Item href="/ListarEmpleados" >Listar Empleados</ReactBoostrap.NavDropdown.Item>
                                <ReactBoostrap.NavDropdown.Divider />
                                <ReactBoostrap.NavDropdown.Item href="/BorrarEmpleado" >Acciones Empleado</ReactBoostrap.NavDropdown.Item>
                            </ReactBoostrap.NavDropdown>

                            <ReactBoostrap.NavDropdown title="Proveedor" id="collasible-nav-dropdown" hidden={hideProveedor}>
                                <ReactBoostrap.NavDropdown.Divider />
                                <ReactBoostrap.NavDropdown.Item href="/CrearProveedor" >Crear Proveedor</ReactBoostrap.NavDropdown.Item>
                                <ReactBoostrap.NavDropdown.Divider />
                                <ReactBoostrap.NavDropdown.Item href="/ListarProveedores" >Listar Proveedores</ReactBoostrap.NavDropdown.Item>
                                <ReactBoostrap.NavDropdown.Divider />
                                <ReactBoostrap.NavDropdown.Item href="/BorrarProveedor" >Acciones Proveedor</ReactBoostrap.NavDropdown.Item>
                                <ReactBoostrap.NavDropdown.Divider />
                                <ReactBoostrap.NavDropdown.Item href="/ProductosProveedor" >Productos Proveedor</ReactBoostrap.NavDropdown.Item>
                            </ReactBoostrap.NavDropdown>

                            <ReactBoostrap.NavDropdown title="Usuario" id="collasible-nav-dropdown" hidden={hideUsuario}>
                                <ReactBoostrap.NavDropdown.Divider />
                                <ReactBoostrap.NavDropdown.Item href="/CrearUsuario" >Crear Usuario</ReactBoostrap.NavDropdown.Item>
                                <ReactBoostrap.NavDropdown.Divider />
                                <ReactBoostrap.NavDropdown.Item href="/ListarUsuarios" >Listar Usuarios</ReactBoostrap.NavDropdown.Item>
                                <ReactBoostrap.NavDropdown.Divider />
                                <ReactBoostrap.NavDropdown.Item href="/BorrarUsuario" >Acciones Usuario</ReactBoostrap.NavDropdown.Item>
                            </ReactBoostrap.NavDropdown>

                            <ReactBoostrap.NavDropdown title="Producto" id="collasible-nav-dropdown" hidden={hideProducto}>
                                <ReactBoostrap.NavDropdown.Divider />
                                <ReactBoostrap.NavDropdown.Item href="/CrearProducto" >Crear Producto</ReactBoostrap.NavDropdown.Item>
                                <ReactBoostrap.NavDropdown.Divider />
                                <ReactBoostrap.NavDropdown.Item href="/ListarProductos" >Listar Productos</ReactBoostrap.NavDropdown.Item>
                                <ReactBoostrap.NavDropdown.Divider />
                                <ReactBoostrap.NavDropdown.Item href="/BorrarProducto" >Acciones Producto</ReactBoostrap.NavDropdown.Item>
                            </ReactBoostrap.NavDropdown>

                            <ReactBoostrap.NavDropdown title="Servicio" id="collasible-nav-dropdown" hidden={hideServicio}>
                                <ReactBoostrap.NavDropdown.Divider />
                                <ReactBoostrap.NavDropdown.Item href="/CrearServicio" >Crear Servicio</ReactBoostrap.NavDropdown.Item>
                                <ReactBoostrap.NavDropdown.Divider />
                                <ReactBoostrap.NavDropdown.Item href="/ListarServicios" >Listar Servicios</ReactBoostrap.NavDropdown.Item>
                                <ReactBoostrap.NavDropdown.Divider />
                                <ReactBoostrap.NavDropdown.Item href="/BorrarServicio" >Acciones Servicio</ReactBoostrap.NavDropdown.Item>
                            </ReactBoostrap.NavDropdown>

                            <ReactBoostrap.NavDropdown title="Categoria" id="collasible-nav-dropdown" hidden={hideCategoria}>
                                <ReactBoostrap.NavDropdown.Divider />
                                <ReactBoostrap.NavDropdown.Item href="/CrearCategoria" >Crear Categoria</ReactBoostrap.NavDropdown.Item>
                                <ReactBoostrap.NavDropdown.Divider />
                                <ReactBoostrap.NavDropdown.Item href="/ListarCategoria" >Listar Categoria</ReactBoostrap.NavDropdown.Item>
                                <ReactBoostrap.NavDropdown.Divider />
                                <ReactBoostrap.NavDropdown.Item href="/BorrarCategoria" >Acciones Categoria</ReactBoostrap.NavDropdown.Item>
                            </ReactBoostrap.NavDropdown>

                            <ReactBoostrap.NavDropdown title="Perfil" id="collasible-nav-dropdown" hidden={hidePerfil}>
                                <ReactBoostrap.NavDropdown.Divider />
                                <ReactBoostrap.NavDropdown.Item href="/CrearPerfil" >Crear Perfil</ReactBoostrap.NavDropdown.Item>
                                <ReactBoostrap.NavDropdown.Divider />
                                <ReactBoostrap.NavDropdown.Item href="/ListarPerfil" >Listar Perfil</ReactBoostrap.NavDropdown.Item>
                                <ReactBoostrap.NavDropdown.Divider />
                                <ReactBoostrap.NavDropdown.Item href="/BorrarPerfil" >Acciones Perfil</ReactBoostrap.NavDropdown.Item>
                            </ReactBoostrap.NavDropdown>

                            <ReactBoostrap.NavDropdown title="Estado" id="collasible-nav-dropdown" hidden={hideEstado}>
                                <ReactBoostrap.NavDropdown.Divider />
                                <ReactBoostrap.NavDropdown.Item href="/CrearEstado" >Crear Estado</ReactBoostrap.NavDropdown.Item>
                                <ReactBoostrap.NavDropdown.Divider />
                                <ReactBoostrap.NavDropdown.Item href="/ListarEstado" >Listar Estado</ReactBoostrap.NavDropdown.Item>
                                <ReactBoostrap.NavDropdown.Divider />
                                <ReactBoostrap.NavDropdown.Item href="/BorrarEstado" >Acciones Estado</ReactBoostrap.NavDropdown.Item>
                            </ReactBoostrap.NavDropdown>

                            <ReactBoostrap.NavDropdown title="Cliente" id="collasible-nav-dropdown" >
                                <ReactBoostrap.NavDropdown.Divider />
                                <ReactBoostrap.NavDropdown.Item href="/CrearCliente" >Crear Cliente</ReactBoostrap.NavDropdown.Item>
                                <ReactBoostrap.NavDropdown.Divider />
                                <ReactBoostrap.NavDropdown.Item href="/ListarCliente" >Listar Cliente</ReactBoostrap.NavDropdown.Item>
                                <ReactBoostrap.NavDropdown.Divider />
                                <ReactBoostrap.NavDropdown.Item href="/BorrarCliente" >Acciones Cliente</ReactBoostrap.NavDropdown.Item>
                            </ReactBoostrap.NavDropdown>

                            <ReactBoostrap.NavDropdown title="Garantia" id="collasible-nav-dropdown">
                                <ReactBoostrap.NavDropdown.Divider />
                                <ReactBoostrap.NavDropdown.Item href="/CrearGarantia" >Crear Garantía</ReactBoostrap.NavDropdown.Item>
                                <ReactBoostrap.NavDropdown.Divider />
                                <ReactBoostrap.NavDropdown.Item href="/BorrarGarantia" >Borrar Garantía</ReactBoostrap.NavDropdown.Item>
                                <ReactBoostrap.NavDropdown.Divider />
                                <ReactBoostrap.NavDropdown.Item href="/ListarGarantia" >Listar Garantía</ReactBoostrap.NavDropdown.Item>
                            </ReactBoostrap.NavDropdown>

                        </ReactBoostrap.Nav>
                        <ReactBoostrap.Nav>
                            <ReactBoostrap.Nav.Link href="/Logout">Logout</ReactBoostrap.Nav.Link>
                        </ReactBoostrap.Nav>
                    </ReactBoostrap.Navbar.Collapse>
                </ReactBoostrap.Navbar>
            </div>
        );
    } else
        return (
            <div>
                <ReactBoostrap.Navbar className='fixed-top' collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <ReactBoostrap.Navbar.Brand href="/PantallaPrincipal">Car Clean</ReactBoostrap.Navbar.Brand>
                    <ReactBoostrap.Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <ReactBoostrap.Navbar.Collapse id="responsive-navbar-nav">
                        <ReactBoostrap.Nav>
                            <ReactBoostrap.Nav.Link href="/Login">Login</ReactBoostrap.Nav.Link>
                        </ReactBoostrap.Nav>
                    </ReactBoostrap.Navbar.Collapse>
                </ReactBoostrap.Navbar>
            </div>

        );
}

export default Nav;
