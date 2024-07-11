export default defineAppConfig({
    pages: ['pages/login/index', 'pages/index/index'],
    window: {
        backgroundTextStyle: 'light',
        navigationBarBackgroundColor: '#fff',
        navigationBarTitleText: '数数羊',
        navigationBarTextStyle: 'black'
    },
    lazyCodeLoading: 'requiredComponents'
});
