'use strict';
var models = require('../Models');
var Factura = models.factura;
const uuidv4 = require('uuid/v4');

class controladorFactura {
  listar(req, res) {
    Factura.findAll({}).then(function (facturas) {
      res.render('plantilla', {
        titulo: 'FACTURACION',
        fragmento: 'fragmentos/frmFacturas',
        //listado: listaV,
        //listaPartes: partes,
      });
    }).catch(function (err) {
                console.log("Error:", err);
                //req.flash('error', 'Hubo un error');
                res.redirect('/Facturas');
            });
  }


  guardar(req, res) {
      Factura.create({
      external_id: uuidv4(),
      nombre: req.body.persona,
      clasificacion: req.body.otros,
      totalFactura: req.body.total,
      fecha: req.body.fecha
    }).then(function (factura, created) {
      if (factura) {
        console.log('se guardo con exito la Factura');
        //req.flash('info', 'Marca Guardada Exitosamente', false);
      }
      res.redirect('/facturas');
    });
  }
  editar(req, res) {
    Factura.update({
      clasificacion: req.body.otros,
      nombre: req.body.persona,
      fecha: req.body.fecha,
      totalFactura: req.body.total}, {where: {external_id: req.body.external}}).then(function (updatedFactura, created) {
        if (updatedFactura) {
          //req.flash('info', 'No se pudo modificar', false);
          console.log('error al update');
        }
        res.redirect('/facturas');
      });
  }
}

module.exports = controladorFactura;
