import { useForm } from 'react-hook-form'
import React, { useState, useRef } from 'react'
import emailjs from '@emailjs/browser'

import logo from './assets/BS-Corp-Logo.png'

function App () {
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
      const tasaInteresMensual = 0.012808087

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
    // valore con comas

    const valorFinal = Number(valor).toLocaleString('en-EN', { style: 'currency', currency: 'USD' })
    const cuotaFinal = Number(cuotaMensual).toFixed(0).toLocaleString('en-EN', { style: 'currency', currency: 'USD' })
    const encajeFinal = Number(encaje).toLocaleString('en-EN', { style: 'currency', currency: 'USD' })
    const entradaFinal = Number(entrada).toLocaleString('en-EN', { style: 'currency', currency: 'USD' })
    const totalFinal = Number(total).toLocaleString('en-EN', { style: 'currency', currency: 'USD' })

    // mostrar info
    setValue('montoaFinanciar', montoaFinanciar)
    setValue('interes', tasaInteresAnual)
    setValue('marca', marcaVehiculo)
    setValue('precio', valorFinal)
    setValue('plazo', plazo)
    setValue('entrada', entradaFinal)
    setValue('cuotas', cuotaFinal)
    setValue('encaje', encajeFinal)
    setValue('total', totalFinal)

    setFormularioEnviado(true) // Marca el formulario como enviado al final de tu lógica

    // enviar correo

    emailjs.sendForm('service_bl2wdeq', 'template_gbre1ul', data, 'tfzmRWBZxWfcJF1TN')
      .then((result) => {
        console.log('desde mailjs ', result.text)
      }, (error) => {
        console.log(error.text)
      })
  }

  const [valor, setValor] = useState('') // Agrega este estado al componente

  const handleValorChange = (e) => {
    setValor(e.target.value)

    console.log(e.target.value)
  }

  const handleEntradaChange = (e) => {
    const porcentajeEntrada = parseFloat(e.target.value)
    const entradaValor = (valor * (porcentajeEntrada / 100)).toFixed(2)

    // Aplicar toLocaleString() para agregar comas en miles
    const entradaConComas = Number(entradaValor).toLocaleString('en-EN', { })

    setValue('textoEntrada', entradaConComas)
    console.log(entradaConComas)
  }

  const [currentDate, setCurrentDate] = useState(new Date())

  const year = currentDate.getFullYear()
  const month = String(currentDate.getMonth() + 1).padStart(2, '0')
  const day = String(currentDate.getDate()).padStart(2, '0')
  const formattedDate = `${year}-${month}-${day}`

  const print = () => window.print()
  return (
    <>
      <div>
        {formularioEnviado
          ? (
            <div className='flex justify-center text-sm px-4'>
              <div className='flex flex-col max-w-screen-lg  '>
                <div className='w-full max-w-screen-lg flex justify-between py-8 items-center border-b-2 border-gray-500 '>
                  <div><img src={logo} alt='Logo' /></div>
                  <div className='text-lg font-semibold'>COTIZACIÓN</div>
                  <div>{formattedDate}</div>
                </div>
                <div className='w-full max-w-screen-lg flex flex-col py-4'>
                  <div className='font-semibold'>Sr/a {watch('nombres', '')}</div>
                  <div>En atención a su importante requerimiento, BUSINESS CORP se complace en hacerle llegar la siguinete cotización:</div>
                </div>
                <div className='w-full max-w-screen-lg flex flex-col py-4'>
                  <div className='font-semibold'>Marca: {watch('marca', '')} </div>
                  <div className='font-semibold'>Precio: <input type='text' defaultValue={watch('precio', '')} /> </div>

                </div>
                <div className='w-full max-w-screen-lg flex flex-row p-4 bg-sky-600 text-white text-center'>
                  <div className='w-1/5'>
                    <div className='font-semibold'>Cantidad</div>

                  </div>
                  <div className='w-1/3'>
                    <div className='font-semibold'>Tipo</div>

                  </div>
                  <div className='w-1/4'>
                    <div className='font-semibold'>Plazo(Meses)</div>

                  </div>
                  <div className='w-1/5'>
                    <div className='font-semibold text-right'>Cuota</div>

                  </div>

                </div>
                <div className='w-full max-w-screen-lg flex flex-row  py-2 border-solid border-2 border-gray-700 text-center font-semibold'>
                  <div className='w-1/5'>

                    <div>1</div>
                  </div>
                  <div className='w-1/3'>

                    <div>FINANCIAMIENTO</div>
                  </div>
                  <div className='w-1/4'>

                    <div>{watch('plazo', '')} </div>
                  </div>
                  <div className='w-1/5 text-end'>

                    <div> ${watch('cuotas', '')} </div>
                  </div>

                </div>
                <div className='font-semibold p-2'>
                  <div className='flex flex-row justify-between'>
                    <div>Forma de Pago: </div><div>Entrada:</div><div> {watch('entrada', '')} </div>
                  </div>
                  <div className='flex flex-row justify-between'>
                    <div>Encaje 5%:</div><div>{watch('encaje', '')} </div>
                  </div>
                  <div className='flex flex-row justify-between'>
                    <div>Total :</div>
                    <div> <input type='text' /> {watch('total', '')} </div>
                  </div>
                </div>
                <div>
                  <div className='text-left'>
                    <div className='flex flex-row py-4'>
                      <div className='w-1/3 font-semibold'>Fecha de Entrega :</div>
                      <div className='w-2/3'>Una vez culminado el proceso prendario vehicular; proceso que se lleva a cabo ante los entes rectores Nacionales: REGISTRO MERCANTIL, A.N.T., A.M.T.</div>
                    </div>
                    <div className='flex flex-row py-4'>
                      <div className='w-1/3 font-semibold'>Dìas aproximados:
                      </div>
                      <div className='w-2/3'>30-45 dìas.</div>
                    </div>

                    <div className='flex flex-row py-4'>

                      <div className='w-1/3 font-semibold'>Nuestro beneficio:</div>
                      <div className='w-2/3'>Crèdito directo, aprobacion inmediata, tasas aliadas de acuerdo al tipo de vehìculo de la necesidad de nuestros clientes.
                      </div>
                    </div>
                  </div>
                  <div className='bg-gray-200 p-4'>
                    <p>Anticipamos nuestro sincero agradecimiento por su gentil y oportuna atención. Importante recalcar que citada cotización tiene una vigencia no mayor a: 1 dìas laborables.
                    </p>
                    <br />
                    <p className='font-medium'>
                      Nota: Los resultados de esta simulación son de carácter informativo y no constituyen una preaprobación del crédito. La información que se utiliza en este simulador se actualiza de manera continua y la tasa de interés utilizada puede haber sufrido alguna modificación.
                    </p>
                  </div>

                  <div className='flex flex-row py-4 justify-around gap-8'>
                    <div>
                      <div className='font-semibold py-4'>Requisitos personas Dependientes:

                      </div>

                      <ul className='list-disc'>
                        <li>Copias de cèdula deudor y conyuge </li>
                        <li>Copias de papeleta de votación deudor conyuge.</li>
                        <li>Copia de servicio bàsico (agua,luz, telefono).</li>
                        <li>Copia del impuesto predial (si posee).</li>
                        <li>Copia de matrìcula del vehìculo (si posee).</li>
                        <li>Certificado de ingreso y 3 ultimos roles de pago.</li>
                        <li>Movimientos bancarios (3 ultimos meses). </li>

                      </ul>
                    </div>
                    <div>
                      <div className='font-semibold  py-4'>Personas Independientes:
                      </div>
                      <ul className='list-disc'>
                        <li>Copias de cèdula deudor y conyuge </li>
                        <li>Copias de papeleta de votación deudor conyuge.</li>
                        <li>Copia de servicio bàsico (agua,luz, telefono).</li>
                        <li>Copia del impuesto predial (si posee).</li>
                        <li>Copia de matrìcula del vehìculo (si posee).</li>
                        <li>Copia del R.U.C. 3 ultimas declaraciones del I.V.A.</li>
                        <li>Movimientos bancarios (3 ultimos meses). </li>
                        <li>Copia del impuesto a la renta (ultimo año).</li>

                      </ul>
                    </div>
                  </div>
                  <div className='font-semibold py-10 text-center'>
                    <h4>Miguel A.</h4>
                    <p>EJECUTIVO SENIOR DE NEGOCIOS, CANAL AUTOMOTRIZ

                    </p>
                  </div>
                </div>
                <div className='py-8 text-center'>
                  <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={print}>
                    Imprimir documento

                  </button>
                </div>
              </div>

            </div>
            )
          : (
            <>
              <div className='flex justify-center p-8 '>

                <form className='w-full max-w-lg' onSubmit={handleSubmit(onSubmit)}>
                  <div className='w-full px-3 mb-9 md:mb-3 text-center font-bold text-xl'>COTIZADOR</div>
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
                        className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-500  rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white'
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
                      <div className='pointer-events-none absolute inset-y-0 pt-6 right-4 flex items-center px-2 text-gray-700'>
                        <svg className='fill-current h-4 w-4' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'><path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' /></svg>
                      </div>
                    </div>
                    <div className='w-full md:w-1/2 px-3 mb-6 md:mb-3'>

                      <label className='block text-gray-700 text-sm font-bold mb-2 uppercase' htmlFor='Entrada'>Entrada real</label>

                      <input
                        className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-500  rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white'
                        type='text'
                        placeholder='Entrada Real'
                        disabled
                        value={watch('textoEntrada') ? `$ ${watch('textoEntrada')}` : ''}

                      />

                    </div>
                    <div className='w-full md:w-1/2 px-3 mb-6 md:mb-3'>
                      <label className='block text-gray-700 text-sm font-bold mb-2 uppercase'>Tipo de vehiculo</label>
                      <select
                        className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-500  rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white'
                        {...register('tipoVehiculo', { required: true })}
                      >
                        <option value={16.5}>Liviano</option>
                        <option value={16.5}>Pesado</option>

                      </select>
                    </div>
                    <div className='w-full md:w-1/2 px-3 mb-6 md:mb-3 relative'>
                      <label className='block text-gray-700 text-sm font-bold mb-2 uppercase'>Plazo (meses)</label>
                      <select
                        className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-500  rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white'
                        {...register('plazo', { required: true })}
                      >

                        <option value='36'>36</option>
                        <option value='48'>48</option>
                        <option value='60'>60</option>
                        <option value='72'>72</option>

                      </select>
                      <div className='pointer-events-none absolute inset-y-0 pt-6 right-4 flex items-center px-2 text-gray-700'>
                        <svg className='fill-current h-4 w-4' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'><path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' /></svg>
                      </div>
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
                      /> Aceptar <a href='https://mtbusiness-corp.com/' target='_new' className='font-medium text-sky-600'>  términos y condiciones</a> de ley de datos<br />
                      {errors.terminos && <span>Debe aceptar los terminos y condiciones</span>}
                    </div>
                    <div className='w-full md:w-full px-3 mb-6 md:mb-3 py-4 text-center'>
                      <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' type='submit'>Calcular</button>
                      <p className='text-gray-300'>version 0.1.1</p>
                    </div>
                  </div>
                </form>
              </div>
            </>
            )}
      </div>

    </>
  )
}

export default App
