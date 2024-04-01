import { useState } from 'react'
import { InView } from 'react-intersection-observer'
import { SkeletonTheme } from 'react-loading-skeleton'
import { NavLink, Outlet, ScrollRestoration } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import clsx from 'clsx'
import { CartPreview } from 'entities/cart'
import { Theme, useTheme } from 'entities/theme'
import Moon from 'shared/assets/icons/moon.svg?react'
import Sun from 'shared/assets/icons/sun.svg?react'
import { CONTENT_NAVIGATION_MENU } from 'shared/consts'
import { IconButton } from 'shared/ui/iconButton'
import { Footer } from 'widgets/footer'
import { Header } from 'widgets/header'

import 'react-toastify/dist/ReactToastify.css'
import './layout.scss'

const baseColorLight = '#ebebeb'
const highlightColorLight = '#f5f5f5'

const baseColorDark = '#202020'
const highlightColorDark = '#44444480'

export const Layout = () => {
    const [isViewHeader, setIsViewHeader] = useState(true)
    const { theme, toggleTheme } = useTheme()

    const Icon = theme === Theme.LIGHT ? Sun : Moon
    const baseColor = theme === Theme.LIGHT ? baseColorLight : baseColorDark
    const highlightColor =
        theme === Theme.LIGHT ? highlightColorLight : highlightColorDark

    const onChangeViewHeader = (inView: boolean): void => {
        setIsViewHeader(inView)
    }

    const navigationContent = CONTENT_NAVIGATION_MENU.map((item) => (
        <li key={item.title} className='layout__navigation-menu-item'>
            <NavLink
                to={item.link}
                end
                className={({ isActive }) =>
                    clsx(
                        'layout__navigation-menu-link',
                        isActive && 'layout__navigation-menu-link_active'
                    )
                }>
                {item.title}
            </NavLink>
        </li>
    ))

    return (
        <div className='layout layout__wrapper'>
            <SkeletonTheme
                baseColor={baseColor}
                highlightColor={highlightColor}>
                <InView
                    as='div'
                    onChange={(inView) => onChangeViewHeader(inView)}>
                    <Header />
                </InView>

                <nav
                    className={clsx(
                        'layout__navigation-menu',
                        !isViewHeader && 'layout__navigation-menu_sticky'
                    )}>
                    <div className='layout__navigation-menu-wrapper _container'>
                        <ul className='layout__navigation-menu-list'>
                            {navigationContent}
                        </ul>

                        <div className='layout__navigation-menu-btn-wrapper'>
                            <CartPreview className='layout__navigation-menu-button' />
                        </div>
                    </div>
                </nav>

                <main className='layout__content'>
                    <Outlet />
                </main>

                <Footer className='layout__footer' />

                <div
                    className={clsx('layout__toggle-theme', theme)}
                    title='Change theme'>
                    <IconButton
                        Icon={Icon}
                        onClick={toggleTheme}
                        isCounterVisible={false}
                        className='layout__icon'
                    />
                </div>

                <ScrollRestoration />
                <ToastContainer
                    position='bottom-right'
                    autoClose={2000}
                    hideProgressBar
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme='colored'
                />
            </SkeletonTheme>
        </div>
    )
}
