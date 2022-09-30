import { useContext } from 'react';
import Alerta from '../../Alerta';
import JogadorContext from './JogadorContext';

function Form() {

    // Example starter JavaScript for disabling form submissions if there are invalid fields
    (function () {
        'use strict'

        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.querySelectorAll('.needs-validation')

        // Loop over them and prevent submission
        Array.prototype.slice.call(forms)
            .forEach(function (form) {
                form.addEventListener('submit', function (event) {
                    if (!form.checkValidity()) {
                        event.preventDefault()
                        event.stopPropagation()
                    }

                    form.classList.add('was-validated')
                }, false)
            })
    })()

    const { objeto, handleChange, acaoCadastrar, alerta, listaTimes }
        = useContext(JogadorContext);
    return (
        <div className="modal fade" id="modalEdicao" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Prédio</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form id="formulario" onSubmit={acaoCadastrar}
                        className="needs-validation" noValidate>
                        <div className="modal-body">
                            <Alerta alerta={alerta} />
                            <div className="form-group">
                                <label htmlFor="txtCodido"
                                    className="form-label">
                                    Código
                                </label>
                                <input
                                    type="text"
                                    readOnly
                                    className="form-control"
                                    id="txtCodido"
                                    name="codigo"
                                    value={objeto.codigo}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="txtNome" className="form-label">
                                    Nome
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="txtNome"
                                    name="nome"
                                    value={objeto.nome}
                                    onChange={handleChange}
                                    required
                                />
                                <div className="valid-feedback">
                                    Campo OK!
                                </div>
                                <div className="invalid-feedback">
                                    Informe o campo nome!
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="txtIdade" className="form-label">
                                    Idade
                                </label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="txtIdade"
                                    maxLength="4"
                                    name="idade"
                                    value={objeto.idade}
                                    onChange={handleChange}
                                    required
                                />
                                <div className="valid-feedback">
                                    Campo OK!
                                </div>
                                <div className="invalid-feedback">
                                    Informe o campo idade!
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="txtAltura" className="form-label">
                                    Altura
                                </label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="txtAltura"
                                    maxLength="4"
                                    name="altura"
                                    value={objeto.altura}
                                    onChange={handleChange}
                                    required
                                />
                                <div className="valid-feedback">
                                    Campo OK!
                                </div>
                                <div className="invalid-feedback">
                                    Informe o campo altura!
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="selectTime" className="form-label">
                                    Time
                                </label>
                                <select
                                    className="form-control"
                                    id="selectTime"
                                    name="time"
                                    value={objeto.time}
                                    onChange={handleChange}
                                    required>
                                    <option disabled="true" value="">
                                        (Selecione o time)
                                    </option>
                                    {listaTimes.map((time) => (
                                        <option key={time.codigo}
                                            value={time.codigo}>
                                            {time.nome}
                                        </option>
                                    ))}
                                </select>
                                <div className="valid-feedback">
                                    Campo OK!
                                </div>
                                <div className="invalid-feedback">
                                    Informe o campo time!
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                            <button type="submit"
                                className="btn btn-success">
                                Salvar
                                <i className="bi bi-save"></i>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Form;