/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package org.pe.mpc.process.mantenimiento.inter;

import org.pe.mpc.demo.dto.beans.DtoParametria;
import org.pe.mpc.demo.entity.Parametria;
import java.util.List;

/**
 *
 * @author apoyo1953
 */
public interface InterProcessParametria {

    void insert(Parametria entidad) throws Exception;

    void insertProcedureJson(DtoParametria entidad) throws Exception;

    void updateProcedureJson(DtoParametria entidad) throws Exception;
    
    void deleteProcedureJson(DtoParametria entidad) throws Exception;

    List<Parametria> listProcedure() throws Exception;

    List<Parametria> listProcedurePaginacion(Long limit, Long offSet) throws Exception;
}
