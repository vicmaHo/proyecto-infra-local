import { renderPreview, amenidades, } from './ConstansFormulario.jsx';
import '../../Styles/FormularioItems.css';
import {
    Home, AttachMoney, People, Hotel, Bathtub,
    CameraAlt, Videocam, Comment,
    Rule,
    Directions
} from '@mui/icons-material';

import {
    TextField, Button, Typography,
    Checkbox, FormControlLabel, Grid, Select, MenuItem, FormControl, InputLabel
} from '@mui/material';


export function FormularioItems({ formulario,

    handleInputChange, handleFileChange, handleAmenidadChange, agregarPropiedad }) {
    return (
        <div className="formulario-items">
        <form onSubmit={(e) => e.preventDefault()}>
            <Grid container spacing={2}>
                <Grid item xs={12}>

                    <FormControl fullWidth variant="outlined">
                        <InputLabel id="select-label">Tipo de propiedad</InputLabel>
                        <Select
                            labelId="select-label"
                            id="simple-select"
                            name='tipoPropiedad'
                            value={formulario.tipoPropiedad}
                            onChange={handleInputChange}
                            label="Tipo de propiedad"
                        >
                            <MenuItem value='Habitacion'>Habitacion</MenuItem>
                            <MenuItem value='Apartamento'>Apartamento</MenuItem>
                            <MenuItem value='Estudio'>Estudio</MenuItem>
                            <MenuItem value='Casa'>Casa</MenuItem>
                        </Select>
                    </FormControl>

                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Nombre de la propiedad"
                        name="nombrePropiedad"
                        value={formulario.nombrePropiedad}
                        onChange={handleInputChange}
                        InputProps={{
                            startAdornment: <Home />
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Descripcion"
                        name="descripcion"
                        value={formulario.descripcion}
                        onChange={handleInputChange}
                        InputProps={{
                            startAdornment: <Comment />
                        }}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        label="Dirección"
                        name="direccion"
                        value={formulario.direccion}
                        onChange={handleInputChange}
                        InputProps={{
                            startAdornment: <Directions />
                        }}
                    />
                </Grid>

                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        label="Reglas"
                        name="reglas"
                        value={formulario.reglas}
                        onChange={handleInputChange}
                        InputProps={{
                            startAdornment: <Rule />
                        }}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        label="Precio"
                        name="precio"
                        type="number"
                        value={formulario.precio}
                        onChange={handleInputChange}
                        InputProps={{
                            startAdornment: <AttachMoney />
                        }}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        label="Huéspedes"
                        name="huespedes"
                        type="number"
                        value={formulario.huespedes}
                        onChange={handleInputChange}
                        InputProps={{
                            startAdornment: <People />
                        }}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        label="Habitaciones"
                        name="habitaciones"
                        type="number"
                        value={formulario.habitaciones}
                        onChange={handleInputChange}
                        InputProps={{
                            startAdornment: <Hotel />
                        }}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        label="Baños"
                        name="banos"
                        type="number"
                        value={formulario.banos}
                        onChange={handleInputChange}
                        InputProps={{
                            startAdornment: <Bathtub />
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="subtitle1" gutterBottom>Amenidades</Typography>
                    <Grid container spacing={2}>
                        {amenidades.map((amenidad) => (
                            <Grid item xs={4} key={amenidad.value}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={formulario.amenidades.includes(amenidad.value)}
                                            onChange={() => handleAmenidadChange(amenidad.value)}
                                            icon={amenidad.icon}
                                            checkedIcon={amenidad.icon}
                                        />
                                    }
                                    label={amenidad.label}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Grid>

                <Grid item xs={3.5}>
                    <input
                        accept="image/*"
                        style={{ display: 'none' }}
                        id="fotos-button"
                        multiple
                        type="file"
                        onChange={handleFileChange}
                        name="fotos"
                    />
                    <label htmlFor="fotos-button">
                        <Button variant="outlined" component="span" startIcon={<CameraAlt />}>
                            Subir Fotos
                        </Button>
                    </label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px' }}>
                        {formulario.fotos.map((foto, index) => (
                            <div key={index}>{renderPreview(foto)}</div>
                        ))}
                    </div>
                </Grid>
                <Grid item xs={4}>
                    <input
                        accept="video/*"
                        style={{ display: 'none' }}
                        id="videos-button"
                        multiple
                        type="file"
                        onChange={handleFileChange}
                        name="videos"
                    />
                    <label htmlFor="videos-button">
                        <Button variant="outlined" component="span" startIcon={<Videocam />}>
                            Subir Videos
                        </Button>
                    </label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px' }}>
                        {formulario.videos.map((video, index) => (
                            <div key={index}>{renderPreview(video)}</div>
                        ))}
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={agregarPropiedad}
                    >
                        Agregar Propiedad
                    </Button>
                </Grid>
            </Grid>
        </form>
        </div>
    )
}