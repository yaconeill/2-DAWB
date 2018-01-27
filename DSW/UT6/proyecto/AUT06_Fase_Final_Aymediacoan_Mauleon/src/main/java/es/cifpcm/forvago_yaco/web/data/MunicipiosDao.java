/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package es.cifpcm.forvago_yaco.web.data;

import es.cifpcm.forvago_yaco.web.model.Municipios;
import java.util.List;

/**
 *
 * @author Yaco
 */
public interface MunicipiosDao {
        public List<Municipios> selectAll();

}
