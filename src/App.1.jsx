import { useForm } from 'react-hook-form'
import { useState } from 'react'

export function App () {
  const { register, formState: { errors }, watch, setValue, handleSubmit } = useForm()
  const [formularioEnviado, setFormularioEnviado] = useState(false) // Añade el estado
  const onSubmit = (data) => {
    let feeFinanciero = 500
    const interesAnual = Number(data.tipoVehiculo)
    const valor = (data.valor)

    if (valor > 39999) {
      feeFinanciero = 1000
      console.log('fee financiero = ' + feeFinanciero)
    } else {
      feeFinanciero = 500
      console.log('fee financiero = ' + feeFinanciero)
    }

    const marcaVehiculo = (data.marcaVehiculo)
    const plazo = (data.plazo)
    const entrada = valor * (data.entrada) / 100
    const montoaFinanciar = valor - entrada + feeFinanciero
    const encaje = valor * 0.05
    const total = Number(entrada + encaje)

    // Ejemplo de uso
    const montoPrestamo = valor - entrada + feeFinanciero // Monto del préstamo en la moneda deseada
    const tasaInteresAnual = interesAnual // Tasa de interés anual (porcentaje)
    const plazoMeses = plazo // Plazo del préstamo en meses

    function calcularCuotaMensual (montoPrestamo, tasaInteresAnual, plazoMeses) {
      // Convertir tasa de interés anual a tasa mensual
      const tasaInteresMensual = tasaInteresAnual / 12 / 100

      // Calcular cuota mensual
      const cuotaMensual = (montoPrestamo * tasaInteresMensual) / (1 - Math.pow(1 + tasaInteresMensual, -plazoMeses))

      return cuotaMensual
    }

    const cuotaMensual = calcularCuotaMensual(montoPrestamo, tasaInteresAnual, plazoMeses)

    console.log('Marca del vehiculo = ' + marcaVehiculo)
    console.log('valor vehiculo = ' + valor)
    console.log(`entrada del ${(data.entrada)}% = ` + entrada)
    console.log('monto a financiar = ' + montoaFinanciar)
    console.log('interes anual = ' + interesAnual + '%')
    console.log('plazo = ' + plazo)
    console.log('La cuota mensual es: $' + cuotaMensual.toFixed(2))

    console.log(data)

    // mostrar info
    setValue('montoaFinanciar', montoaFinanciar)
    setValue('interes', tasaInteresAnual)
    setValue('marca', marcaVehiculo)
    setValue('precio', valor)
    setValue('plazo', plazo)
    setValue('entrada', entrada)
    setValue('cuotas', cuotaMensual.toFixed())
    setValue('encaje', encaje)
    setValue('total', total)

    setFormularioEnviado(true) // Marca el formulario como enviado al final de tu lógica
  }
  const [valor, setValor] = useState('') // Agrega este estado al componente

  const handleValorChange = (e) => {
    setValor(e.target.value)
    console.log(e.target.value)
  }

  const handleEntradaChange = (e) => {
    const porcentajeEntrada = parseFloat(e.target.value)
    const entradaValor = valor * (porcentajeEntrada / 100)
    setValue('textoEntrada', entradaValor.toFixed(0))
  }

  return (
    <>
      <div>
        {formularioEnviado
          ? (

            <div id='final'>
              <div><img src='' alt='Logo' /></div>
              <div><h2>COTIZACIÓN</h2></div>
              <div>Sr/a{watch('nombres', '')}</div>
              <div>En atenciòn a su importante requerimiento, BUSINESS CORP se complace en hacerle llegar la siguinete cotizaciòn:</div>
              <div>Marca:{watch('marca', '')} </div>
              <div>Precio:{watch('precio', '')} </div>
              <div>Plazo:{watch('plazo', '')} </div>
              <div>Cuota:{watch('cuotas', '')} </div>
              <div>Entrada:{watch('entrada', '')} </div>
              <div>Encaje 5%:{watch('encaje', '')} </div>
              <div>Total :{watch('total', '')} </div>

              <div>
                <h4>Fecha de Entrega :</h4>
                <p>Una vez culminado el proceso prendario vehicular; proceso que se lleva a cabo ante los entes rectores Nacionales: REGISTRO MERCANTIL, A.N.T., A.M.T.           </p>
                <h4>Dìas aproximados:
                </h4>
                <p>30-45 dìas.
                </p>

                <h4>Nuestro beneficio:
                </h4>
                <p>Crèdito directo, aprobacion inmediata, tasas aliadas de acuerdo al tipo de vehìculo de la necesidad de nuestros clientes.
                </p>
                <p>Anticipamos nuestro sincero agradecimiento por su gentil y oportuna atenciòn. Importante recalcar que citada cotizaciòn tiene una vigencia no mayor a: 1 dìas laborables.
                </p>
                <h4>Requisitos:

                </h4>
                <h4>Personas Dependientes: </h4>
                <ul>
                  <li>Copias de cèdula deudor y conyuge </li>
                  <li>Copias de papeleta de votaciòn deudor conyuge.</li>
                  <li>Copia de servicio bàsico (agua,luz, telefono).</li>
                  <li>Copia del impuesto predial (si posee).</li>
                  <li>Copia de matrìcula del vehìculo (si posee).</li>
                  <li>Certificado de ingreso y 3 ultimos roles de pago.</li>
                  <li>Movimientos bancarios (3 ultimos meses). </li>

                </ul>
                <h4>Personas Independientes:
                </h4>
                <ul>
                  <li>Copias de cèdula deudor y conyuge </li>
                  <li>Copias de papeleta de votaciòn deudor conyuge.</li>
                  <li>Copia de servicio bàsico (agua,luz, telefono).</li>
                  <li>Copia del impuesto predial (si posee).</li>
                  <li>Copia de matrìcula del vehìculo (si posee).</li>
                  <li>Copia del R.U.C. 3 ultimas declaraciones del I.V.A.</li>
                  <li>Movimientos bancarios (3 ultimos meses). </li>
                  <li>Copia del impuesto a la renta (ultimo año).</li>

                </ul>

                <h4>Miguel A.</h4>
                <p>EJECUTIVO SENIOR DE NEGOCIOS, CANAL AUTOMOTRIZ
                </p>
              </div>
            </div>

            )
          : (
            <>
              <div className='w-full max-w-lg flex justify-center'>
                <h2 className='block text-gray-700 font-bold mb-2 text-lg h-10'>SIMULADOR DE CRÉDITO AUTOMOTRIZ</h2>
              </div>
              <form className='w-full max-w-lg' onSubmit={handleSubmit(onSubmit)}>

                <div className='flex flex-wrap -mx-3 mb-6'>

                  <div className='w-full md:w-1/2 px-3 mb-9 md:mb-3'>
                    <label className='block text-gray-700 text-sm font-bold mb-2'>VALOR DEL VEHÍCULO</label>
                    <input
                      className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-500  rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white'
                      type='text'
                      placeholder='Valor del vehiculo'
                      {...register('valor', { required: true })}
                      onChange={handleValorChange}
                    />
                    {errors.valor && <span>Este campo es requerido</span>}

                  </div>
                  <div className='relative w-full md:w-1/2 px-3 mb-6 md:mb-3'>
                    <label className=' text-gray-700 text-sm font-bold mb-2'>PORCENTAJE DE ENTRADA</label>
                    <select
                      className='block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 border-gray-500'
                      {...register('entrada', {
                        required: {
                          value: true,
                          message: 'Este campo es requerido'
                        }
                      })}
                      onChange={handleEntradaChange}
                    >
                      <option />
                      <option value='30'>30%</option>
                      <option value='45'>45%</option>
                      <option value='50'>50%</option>
                      <option value='55'>55%</option>

                    </select>
                    {errors.entrada && <span>Este campo es requerido</span>}
                    <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
                      <svg className='fill-current h-4 w-4' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'><path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' /></svg>
                    </div>
                  </div>
                  <div className='w-full md:w-1/2 px-3 mb-6 md:mb-3'>

                    <label className='block text-gray-700 text-sm font-bold mb-2 uppercase' htmlFor='Entrada'>Entrada real</label>

                    <input
                      className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-500  rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white'
                      type='text' placeholder='Entrada Real'
                      disabled
                      value={`$ ${watch('textoEntrada')}`}
                    />

                  </div>
                  <div className='w-full md:w-1/2 px-3 mb-6 md:mb-3'>
                    <label className='block text-gray-700 text-sm font-bold mb-2 uppercase'>Tipo de vehiculo</label>
                    <select
                      className='block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 border-gray-500'
                      {...register('tipoVehiculo', { required: true })}
                    >
                      <option value={16}>liviano</option>
                      <option value={13}>pesado</option>

                    </select>
                  </div>
                  <div className='w-full md:w-1/2 px-3 mb-6 md:mb-3'>
                    <label className='block text-gray-700 text-sm font-bold mb-2 uppercase'>Plazo (meses)</label>
                    <select
                      className='block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 border-gray-500'
                      {...register('plazo', { required: true })}
                    >
                      <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
                        <svg className='fill-current h-4 w-4' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'><path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' /></svg>
                      </div>
                      <option value='36'>36</option>
                      <option value='48'>48</option>
                      <option value='60'>60</option>
                      <option value='72'>72</option>

                    </select>

                  </div>
                  <div className='w-full md:w-1/2 px-3 mb-6 md:mb-3'>
                    <label className='block text-gray-700 text-sm font-bold mb-2 uppercase'>Marca del vehiculo</label>
                    <input
                      className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-500  rounded py-3 px-4  leading-tight focus:outline-none focus:bg-white'
                      type='text'
                      placeholder='Marca de vehiculo'
                      {...register('marcaVehiculo')}
                    />
                  </div>
                  <div className='w-full md:w-full px-3 mb-6 md:mb-3'>
                    <div className='block text-gray-700 text-md font-bold mb-2 uppercase text-center py-4'> INFORMACIÓN DEL SOLICITANTE </div>
                  </div>
                  <div className='w-full md:w-1/2 px-3 mb-6 md:mb-3'>

                    <label className='block text-gray-700 text-sm font-bold mb-2 uppercase' htmlFor='nombres'>Nombres completos</label>

                    <input
                      className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-500  rounded py-3 px-4  leading-tight focus:outline-none focus:bg-white'
                      type='text' placeholder='Nombres completos'
                      {...register('nombres', { required: true })}
                    />
                    {errors.nombres && <span>Este campo es requerido</span>}

                  </div>
                  <div className='w-full md:w-1/2 px-3 mb-6 md:mb-3'>
                    <label className='block text-gray-700 text-sm font-bold mb-2 uppercase'>Cédula</label>

                    <input
                      className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-500  rounded py-3 px-4  leading-tight focus:outline-none focus:bg-white'
                      type='text' placeholder='Cédula'
                      {...register('cedula', { required: true })}
                    />
                    {errors.cedula && <span>Este campo es requerido</span>}

                  </div>
                  <div className='w-full md:w-1/2 px-3 mb-6 md:mb-3'>

                    <label className='block text-gray-700 text-sm font-bold mb-2 uppercase'>Correo</label>

                    <input
                      className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-500  rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white'
                      type='text' placeholder='Correo'
                      {...register('correo', {
                        required: {
                          value: true,
                          message: 'Este campo es requerido'
                        },
                        pattern: {
                          value: /^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$/,
                          message: 'Correo invalido'
                        }
                      })}
                    />
                    {errors.correo && <span>{errors.correo.message}</span>}
                  </div>
                  <div className='w-full md:w-1/2 px-3 mb-6 md:mb-3'>
                    <label className='block text-gray-700 text-sm font-bold mb-2 uppercase'>Teléfono</label>

                    <input
                      className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-500 rounded py-3 px-4  leading-tight focus:outline-none focus:bg-white'
                      type='text' placeholder='Teléfono'
                      {...register('telefono', { required: true })}
                    />
                    {errors.telefono && <span>Este campo es requerido</span>}
                  </div>
                  <div className='w-full px-3 mb-6 md:mb-3'>
                    <input
                      className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                      {...register('terminos', { required: true })}
                      name='terminos'
                      value={false}
                      type='checkbox'
                    /> Aceptar términos y condiciones de ley de datos<br />
                    {errors.terminos && <span>Debe aceptar los terminos y condiciones</span>}
                  </div>
                  <div className='w-full md:w-full px-3 mb-6 md:mb-3 py-4 text-center'>
                    <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' type='submit'>Calcular</button>
                  </div>
                </div>
              </form>
            </>
            )}
      </div>

    </>
  )
}
