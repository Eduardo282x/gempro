import { Card, CardContent } from '@/components/ui/card'
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { IChangePasswordForm, validateSchema } from './profile.data';
import { useState } from 'react';
import { ScreenLoader } from '@/components/loaders/ScreenLoader';
import { IBaseResponse } from '@/interfaces/base.interface';
import { Snackbar } from '@/components/snackbar/Snackbar';
import { putDataApiNormal } from '@/backend/basicAPI';
import { validateToken } from '@/helper/authentication';

export const Profile = () => {
    const [loader, setLoader] = useState<boolean>(false);
    const [showSnackbar, setShowSnackbar] = useState<boolean>(false);
    const [responseApi, setResponseApi] = useState<IBaseResponse>({} as IBaseResponse);

    const handleShowSnackbar = () => {
        setShowSnackbar(true);
        setTimeout(() => setShowSnackbar(false), 3000); // Oculta después de 3 segundos
    };

    const { register, handleSubmit, formState: { errors }, reset } = useForm<IChangePasswordForm>({
        defaultValues: {
            password: '',
            confirmPassword: ''
        },
        resolver: zodResolver(validateSchema)
    });

    const onSubmit = async (changePassword: IChangePasswordForm) => {
        setLoader(true);

        const bodyPassword = {
            userId: validateToken()?.id as number,
            password: changePassword.password,
        }

        await putDataApiNormal('/auth/password', bodyPassword).then((response: IBaseResponse) => {
            handleShowSnackbar();
            setResponseApi(response);
            setLoader(false);
            reset();
        })
    }

    return (
        <div>
            {loader && <ScreenLoader></ScreenLoader>}
            <Card>
                <CardContent>
                    <div className='w-1/2 mx-auto p-6'>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <p className='my-6'>Actualizar contraseña</p>
                            <div className="mb-6">
                                <label className="block mb-2 text-sm text-gray-600">Contraseña</label>
                                <input {...register('password')} className="w-full px-4 py-2 border rounded-lg outline-none" required />
                                {errors.password && <span className='text-red-500 text-sm ml-2'>{errors.password?.message}</span>}
                            </div>
                            <div className="mb-6">
                                <label className="block mb-2 text-sm text-gray-600">Confirmar contraseña</label>
                                <input {...register('confirmPassword')} className="w-full px-4 py-2 border rounded-lg outline-none" required />
                                {errors.confirmPassword && <span className='text-red-500 text-sm ml-2'>{errors.confirmPassword?.message}</span>}
                            </div>
                            <button type="submit" className="w-32 disabled:bg-gray-400 bg-[#062a76] hover:bg-[#172b56] text-white py-2 rounded-lg mx-auto block focus:outline-none  mt-4">Actualizar</button>
                        </form>
                    </div>
                </CardContent>
            </Card>

            {showSnackbar && responseApi && <Snackbar baseResponse={responseApi} />}
        </div>
    )
}
