import { useRouteError } from 'react-router-dom'
import MainLayout from '@/layouts/MainLayout'

export default function ErrorPage() {
  const error = useRouteError()
  console.log(error)
  return (
    <MainLayout>
      <div className="w-full h-full flex flex-1 justify-center items-center text-center">
        <div id="error-page">
          <h1 className="text-3xl py-10">
            {error?.status}:{error?.statusText || error?.message || 'Unknown Error'}
          </h1>
          <p>Sorry, an unexpected error has occurred.</p>
        </div>
      </div>
    </MainLayout>
  )
}
