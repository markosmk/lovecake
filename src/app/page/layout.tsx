/* eslint-disable @next/next/no-img-element */
'use client';
import { Toaster } from '@/components/ui/toast';
import { CakeIcon, FormInputIcon } from 'lucide-react';
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="max-w-md mx-auto min-h-screen flex flex-col gap-3 px-3 md:px-0">
      <Toaster />
      {/* header */}
      <header className="relative">
        <div className="absolute z-10 top-3 right-3 flex gap-2">
          <a href="#" className="active:scale-90 transition-transform  text-white hover:text-rose-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="w-6 h-6"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </a>
          <a href="#" className="active:scale-90 transition-all text-white hover:text-green-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 f"
              fill="currentColor"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
            </svg>
          </a>
        </div>
        <div className="relative h-[160px] w-full -z-10">
          <div className="absolute bottom-0 right-0 left-0 h-[120px] w-full bg-gradient-to-t from-white from-10%"></div>
          <img
            src="https://picsum.photos/id/222/600/300"
            className="w-full h-full object-cover rounded-3xl"
            alt="Image Main front Header"
          />
        </div>

        <div className="flex flex-col -mt-12 z-10">
          <div className="flex items-center">
            <img
              className="inline-block flex-shrink-0 h-[4rem] w-[4rem] rounded-3xl ml-3 border-4 border-white"
              src="https://picsum.photos/id/33/200"
              alt="Image Profile"
            />
            <div className="ml-3">
              <h3 className="font-semibold text-gray-800 dark:text-white">AmorDiscos</h3>
              <p className="text-sm font-medium text-gray-400">Iris Carolina, Tunuyan, Mza</p>
            </div>
          </div>
          {/* <div className="text-sm mt-2 ml-3 text-gray-400">Descripcion o fotos de instagram</div> */}
        </div>
      </header>

      {/* content */}
      <div className="flex-1 my-4">{children}</div>
      {/* footer */}
      <footer className="bg-white pb-4 md:pb-8 lg:pb-10 dark:bg-slate-800">
        <div className="mx-auto max-w-screen-xl text-center">
          <a
            href="#"
            className="flex justify-center items-center text-2xl font-semibold text-slate-900 dark:text-white"
          >
            <FormInputIcon className="mr-2 h-8 w-8" />
            LoverForms
          </a>
          <p className="mt-2 mb-4 text-slate-400 text-sm dark:text-slate-400">
            Create your custom form for your website!.
          </p>
          <span className="text-sm text-slate-800 sm:text-center dark:text-slate-400">
            © 2021-2023
            <a href="#" className="ml-2 hover:underline">
              LoverForms™
            </a>
            . All Rights Reserved.
          </span>
        </div>
      </footer>
    </div>
  );
}