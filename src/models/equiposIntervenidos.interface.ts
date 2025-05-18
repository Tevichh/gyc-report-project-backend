export interface EquiposIntervenidos {
    equipo: string;
    serial: string;
    estado: "Cambio" | "Mantenimiento" | "Suministro_Retiro" | "No_Aplica";
    serialAnterior: string;
    reportId: number;
}
