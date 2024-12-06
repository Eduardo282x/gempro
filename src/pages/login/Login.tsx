import { useForm, useFormState } from 'react-hook-form';
import imgGempro from '../../assets/img/gemproLogo3.jpg';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';

import { z } from 'zod';
import { postDataApi } from '@/backend/basicAPI';
import { IAuthResponse, IBaseResponse } from '@/interfaces/base.interface';
import { ScreenLoader } from '@/components/loaders/ScreenLoader';

interface ILogin {
    username: string;
    password: string;
}

const validateSchema = z.object({
    username: z.string().refine(text => text !== ''),
    password: z.string().refine(text => text !== ''),
})

export const Login = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [loader, setLoader] = useState<boolean>(false);
    const [messageApi, showMessageApi] = useState<IBaseResponse>({message:'', success: true});

    const { register, handleSubmit, control } = useForm<ILogin>({
        defaultValues: {
            username: '',
            password: ''
        },
        resolver: zodResolver(validateSchema)
    });

    useEffect(() => {
        localStorage.removeItem('token')
    }, [])

    const { isValid } = useFormState({ control });

    const onSubmit = async (login: ILogin) => {
        setLoader(true);
        await postDataApi('/auth', login).then((response: IAuthResponse | IBaseResponse) => {
            if (response.success && 'token' in response) {
                localStorage.setItem('token', response.token);
                showMessageApi(response)
                setTimeout(() => {
                    navigate('/admin/reports');
                }, 1000);
            } else {
                showMessageApi(response)
            }

            setLoader(false);
        }).catch(err => {
            const errorMessage: IBaseResponse = {
                success: false,
                message: err.message
            }
            showMessageApi(errorMessage)
            setLoader(false);
        })
    }

    return (
        <div>
            {loader && (
                <ScreenLoader></ScreenLoader>
            )}
            <div className="min-h-screen flex items-center justify-center">
                <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-xl">
                    <div className="flex justify-center mb-4" onClick={() => navigate('/')}>
                        <img src={imgGempro} alt="Logo" className="w-30 h-20" />
                    </div>
                    <h1 className="text-2xl font-semibold text-center text-gray-700 mt-8 mb-6">Iniciar sesión</h1>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-6">
                            <label className="block mb-2 text-sm text-gray-600">Usuario</label>
                            <input {...register('username')} className="w-full px-4 py-2 border rounded-lg outline-none" required />
                        </div>
                        <div className="mb-6">
                            <label className="block mb-2 text-sm text-gray-600">Contraseña</label>
                            <div className='w-full flex items-center justify-between px-4 py-2 border rounded-lg '>
                                <input {...register('password')} type={showPassword ? "text" : "password"} className="outline-none w-[90%]" required />
                                <span onClick={() => setShowPassword(!showPassword)} className='material-icons cursor-pointer'>{showPassword ? 'visibility' : 'visibility_off'}</span>
                            </div>
                            {/* <span className="block text-right text-xs text-cyan-600 mt-2">¿Olvidaste tu contraseña?</span> */}
                        </div>

                        {messageApi.message !== '' && (<p className={` text-white text-center text-sm ${messageApi.success ? 'bg-green-500' : 'bg-red-500'} rounded-md py-4 w-auto`}>{messageApi.message}</p>)}
                        <button type="submit" disabled={!isValid} className="w-32 disabled:bg-gray-400 bg-[#062a76] hover:bg-[#172b56] text-white py-2 rounded-lg mx-auto block focus:outline-none  mt-4 mb-6">Acceso</button>
                    </form>
                    {/* <div className="text-center">
                        <p className="text-sm">¿No tienes una cuenta? <span className="text-cyan-600">Regístrate ahora</span></p>
                    </div> */}
                    {/* <p className="text-xs text-gray-600 text-center mt-10">&copy; 2024</p> */}
                </div>
            </div>
        </div>
    )
}
