import Image from  'next/image';
import { useEffect, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import toast from 'react-hot-toast';
import { FileIconElement } from './FileIconElement';


export interface Props {
    innerLabel?: string;
    name?: string;
    value: string | File | undefined;
    onChange: (value: File) => Promise<void>;
    type?: 'image' | 'document' | 'video' | 'any';
    showPreview?: boolean;
    label?: string;
    showError?: boolean;
    errorMessage?: string;
    style?: string;
  }

  const mimeTypes = (type: Props['type']): string => {
    switch (type) {
      case 'image':
        return 'image/jpeg,image/png';
      case 'document':
        return 'application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document';
      case 'video':
        return 'video/mp4,video/webm';
      default:
        return '*';
    }
  };

  const fileExts = (type: Props['type']): string => {
    switch (type) {
      case 'image':
        return 'JPEG, PNG';
      case 'document':
        return 'PDF, DOC, DOCX';
      case 'video':
        return 'MP4, WEBM';
      default:
        return '';
    }
  };


  export const DropZoneElement = ({
    innerLabel = 'Drop your files here',
    value,
    name = '',
    onChange,
    showPreview = true,
    type = 'any',
    label = '',
    showError = false,
    errorMessage = '',
    style = ''
  }: Props) => {
    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
      maxFiles: 1,
      maxSize: 5 * 1024 * 1024,
      onDropRejected: (fileRejections) => {
        fileRejections.map((r) => toast.error(() => r.errors[0].message));
      },
    });
  
    const [error, setError] = useState<boolean>(false);
  
    const previewURL = useRef<string>(
      type === 'image' && value instanceof File ? URL.createObjectURL(acceptedFiles[0] || (value as File)) : ''
    );
  
    useEffect(() => {
      if (acceptedFiles.length > 0) {
        setError(false);
        if (previewURL.current.length > 0) URL.revokeObjectURL(previewURL.current);
        previewURL.current = URL.createObjectURL(acceptedFiles[0] || (value as File));
        void onChange(acceptedFiles[0] || (value as File));
      }
    }, [acceptedFiles, onChange, value]);
  
    useEffect(() => {
      return () => {
        URL.revokeObjectURL(previewURL.current);
      };
    }, []);
  
    useEffect(() => {
      if (showError) {
        setError(true);
      }
    }, [showError]);
  
    const preview = () => {
      return (
        <div className={`h-8 w-8 relative block p-4`}>
  
          {type === 'video' ? (
            <video src={value instanceof File ? previewURL.current : value} className="m-auto" controls />
          ) : null}
          {type === 'document' ? (
            <a href="/" target="_self" className="flex">
              <FileIconElement size="small" />
              <span className="inline-block pl-4 pt-2 hover:underline">{(value as File).name}</span>
            </a>
          ) : null}
        </div>
      );
    };
  
    return (
      <div className="dropzone">
        <label htmlFor={name} className="block text-gray-001 text-sm py-2">
          {label}
        </label>
        <section
          className={`${style ? style : 'h-32 w-full h-min-32'}  cursor-pointer flex flex-col items-center justify-center h-min-32 border  rounded-md text-gray-001 hover:bg-slate-50 text-sm ${
            error ? 'border-red-600' : 'border-slate-300'
          }`}
        >
          <div {...getRootProps({ className: 'dropzone h-full w-full flex flex-col items-center' })}>
            <input id={name} {...getInputProps({ name })} />
            {!value ? (
              <p className="m-auto self-center">
                {innerLabel}
                {` (${fileExts(type)} 5MB max)`}
              </p>
            ) : null}
            {value && showPreview ? preview() : null}
            {value ? (
              <p className="text-center">{`Click or drop another file to change (${fileExts(type)} 5MB max)`}</p>
            ) : null}
          </div>
        </section>
        {/* <button onClick={async()=>await uploadToipfs()>swetank upload</button> */}

  
        {error ? <span className="text-sm text-red-600">{errorMessage || 'Error'}</span> : null}
      </div>
      
    );
  };


 