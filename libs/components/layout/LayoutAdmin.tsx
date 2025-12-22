import type { ComponentType } from 'react';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import AdminMenuList from '../admin/AdminMenuList';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { Menu, MenuItem } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Head from 'next/head';

const drawerWidth = 280;

const withAdminLayout = (Component: ComponentType) => {
	return (props: object) => {
		const router = useRouter();
		const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
		const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
		const [title, setTitle] = useState('admin');

		/** HANDLERS **/
		const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
			setAnchorElUser(event.currentTarget);
		};

		const handleCloseUserMenu = () => {
			setAnchorElUser(null);
		};

		const logoutHandler = () => {
			router.push('/').then();
		};

		return (
			<>
				<Head>
					<title>Timory - Admin</title>
				</Head>
				<main id="pc-wrap" className="admin">
					<Box component={'div'} sx={{ display: 'flex' }}>
						<AppBar
							position="fixed"
							sx={{
								width: `calc(100% - ${drawerWidth}px)`,
								ml: `${drawerWidth}px`,
								boxShadow: 'rgb(100 116 139 / 12%) 0px 1px 4px',
								background: 'none',
								backgroundColor: '#ffffff',
							}}
						>
							<Toolbar>
								<Tooltip title="Open settings">
									<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
										<Avatar
											src={'/img/profile/defaultUser.svg'}
										/>
									</IconButton>
								</Tooltip>
								<Menu
									sx={{ mt: '45px' }}
									id="menu-appbar"
									className={'pop-menu'}
									anchorEl={anchorElUser}
									anchorOrigin={{
										vertical: 'top',
										horizontal: 'right',
									}}
									keepMounted
									transformOrigin={{
										vertical: 'top',
										horizontal: 'right',
									}}
									open={Boolean(anchorElUser)}
									onClose={handleCloseUserMenu}
								>
									<Box
										component={'div'}
										onClick={handleCloseUserMenu}
										sx={{
											width: '200px',
										}}
									>
										<Stack sx={{ px: '20px', my: '12px' }}>
											<Typography variant={'h6'} component={'h6'} sx={{ mb: '4px' }}>
												Admin User
											</Typography>
											<Typography variant={'subtitle1'} component={'p'} color={'#757575'}>
												admin@timory.com
											</Typography>
										</Stack>
										<Divider />
										<Box component={'div'} sx={{ p: 1, py: '6px' }} onClick={logoutHandler}>
											<MenuItem sx={{ px: '16px', py: '6px' }}>
												<Typography variant={'subtitle1'} component={'span'}>
													Logout
												</Typography>
											</MenuItem>
										</Box>
									</Box>
								</Menu>
							</Toolbar>
						</AppBar>

						<Drawer
							sx={{
								width: drawerWidth,
								flexShrink: 0,
								'& .MuiDrawer-paper': {
									width: drawerWidth,
									boxSizing: 'border-box',
								},
							}}
							variant="permanent"
							anchor="left"
							className="aside"
						>
							<Toolbar sx={{ flexDirection: 'column', alignItems: 'flexStart' }}>
								<Stack className={'logo-box'}>
									<img src={'/img/logo/Timorylogo.png'} alt={'Timory logo'} style={{ width: '120px', height: 'auto' }} />
								</Stack>

								<Stack
									className="user"
									direction={'row'}
									alignItems={'center'}
									sx={{
										borderRadius: '8px',
										px: '24px',
										py: '11px',
										mt: 2,
									}}
								>
									<Avatar
										src={'/img/profile/defaultUser.svg'}
									/>
									<Typography variant={'body2'} p={1} ml={1}>
										Admin User <br />
										admin@timory.com
									</Typography>
								</Stack>
							</Toolbar>

							<Divider />

							<AdminMenuList />
						</Drawer>

						<Box 
							component={'div'} 
							id="bunker" 
							sx={{ 
								flexGrow: 1, 
								mt: '64px',
								p: 3,
								backgroundColor: '#f5f5f5',
								minHeight: 'calc(100vh - 64px)',
							}}
						>
							{/*@ts-ignore*/}
							<Component {...props} setSnackbar={setSnackbar} setTitle={setTitle} />
						</Box>
					</Box>
				</main>
			</>
		);
	};
};

export default withAdminLayout;