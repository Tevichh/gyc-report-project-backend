export type EstadoReporte = "Pendiente" | "Finalizado" | "En_Proceso" | "Cancelado"; // usa los valores reales de tu enum Prisma

export interface Reporte {
    fechaInicio?: Date;
    fechaFin?: Date;
    tipoActividad?: string;
    NoTicket?: string;
    sistema?: string;
    zona?: string;
    cliente?: string;
    locacion?: string;
    nombrePunto?: string;
    descripcionSolicitud?: string;
    descripcionActividad?: string;
    SolucionoRequimiento?: boolean;
    nuevaIntervencion?: boolean;
    estado: EstadoReporte;
    idTecnicoResponsable: number;
}


export interface AnexosFotograficos {
    url: string;
    reportId: number;
}

