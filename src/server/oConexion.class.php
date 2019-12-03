<?php

class oConexion {

    private $servidor;
    private $baseDatos;
    private $usuario;
    private $clave;
    private $charset;
    private $idConexion;
    private $conexion;

    /**
     * Constructor
     */
    function __construct($servidor = '', $bd = '', $usuario = '', $clave = '') {
        $this->servidor = $servidor;
        $this->baseDatos = $bd;
        $this->usuario = $usuario;
        $this->clave = $clave;
        $this->charset = "utf8";
        $this->conexion = NULL;
        $this->idConexion = NULL;
    }

    /**
     * Abre la conexión con la base de datos
     * @return bool Devuelve TRUE si se pudo realizar la conexión o FALSE en caso contrario
     * @access public
     */
    public function abrir() {
        $oConni = new mysqli($this->servidor, $this->usuario, $this->clave, $this->baseDatos) or die("Error al conectar.");
        $oConni->set_charset($this->charset);

        if ($oConni->connect_errno) {
            die('Error de conexión ' . $oConni->connect_errno . ': ' . $oConni->connect_error);
        }
        $this->conexion = $oConni;
        $this->idConexion = $oConni->thread_id;
        return (TRUE);
    }

    /**
     * Cierra la conexión con la base de datos
     * @return bool Devuelve TRUE si se pudo realizar la desconexión o FALSE en caso contrario
     * @access public
     */
    public function cerrar() {
        if (is_null($this->idConexion)) {
            return (FALSE);
        }
        if ($this->conexion->close()) {
            $this->conexion = NULL;
            $this->idConexion = NULL;
            return (TRUE);
        } else {
            return (FALSE);
        }
    }

    /**
     * Obtiene la dirección del servidor que alberga la base de datos
     * @return string
     * @access public
     */
    public function obtenerServidor() {
        return $this->servidor;
    }

    /**
     * Obtiene el nombre de la base de datos sobre la que se realiza la conexión
     * @return string
     * @access public
     */
    public function obtenerBaseDatos() {
        return $this->baseDatos;
    }

    /**
     * Obtiene la identificación del usuario propietario de la conexión
     * @return string
     * @access public
     */
    public function obtenerUsuario() {
        return $this->usuario;
    }

    /**
     * Obtiene la clave de acceso del usuario
     * @return string
     * @access public
     */
    public function obtenerClave() {
        return $this->clave;
    }

    /**
     * Obtiene el charset de la conexión
     * @return string
     * @access public
     */
    public function obtenerCharset() {
        return $this->charset;
    }

    /**
     * Obtiene el identificador de la conexión
     * @return resource
     * @access public
     */
    public function obtenerIdConexion() {
        return $this->idConexion;
    }

    /**
     * Obtiene el identificador de la conexión
     * @return resource
     * @access public
     */
    public function obtenerConexion() {
        return $this->conexion;
    }

}
