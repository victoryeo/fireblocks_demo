import Link from 'next/link';
import router from 'next/router';
import { useState, useEffect } from 'react';
import { CustomConnectButton } from "./CustomeConnectButton";

export const Options = () => {
  const [isLogin, setLogin] = useState<boolean>(false);
  useEffect(() => {
    if (localStorage.getItem('user')) {
      setLogin(true);
    }
  });

  const admin = localStorage.getItem('user') === 'admin' ? true : false;
  const options = [
    {
      label: 'Secret Page',
      href: '/secret',
      hide: admin,
    },
    {
      label: 'DID Management',
      href: '/did',
      hide: admin,
    },
    {
      label: 'Lock Access',
      href: '/lock',
    },
    {
      label: 'User Profile',
      href: '/profile',
    },
  ];

  return (
    <div>
      {isLogin && (
        <ul className="list_type">
          {options.map(({ href, label, hide }) => {
            if (!hide) {
              return (
                <li style={{ margin: 4 }} key={label}>
                  <Link href={href} className="list_font">
                    <span
                      className={
                        router.pathname === href
                          ? 'active_sidebar_list'
                          : 'sidebar_list'
                      }
                    >
                      {label}
                    </span>
                  </Link>
                </li>
              );
            }
          })}
        </ul>
      )}
    </div>
  );
};
