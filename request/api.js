export const setting = (params, config = {}) => uni.$uv.http.post('/api/setting', params, config)
export const upload = (params, config = {}) => uni.$uv.http.upload('/api/upload', params, config)

export const smsSend = (params, config = {}) => uni.$uv.http.post('/api/sms/send', params, config)
export const register = (params, config = {}) => uni.$uv.http.post('/api/register', params, config)
export const forgot = (params, config = {}) => uni.$uv.http.post('/api/forgot', params, config)
export const login = (params, config = {}) => uni.$uv.http.post('/api/login', params, config)
export const wechatSetting = (params, config = {}) => uni.$uv.http.post('/api/wechat/setting', params, config)

export const wechatLogin = (params, config = {}) => uni.$uv.http.post('/api/login/wechat', params, config)
export const userBindWechat = (params, config = {}) => uni.$uv.http.post('/api/user/bind/wechat', params, config)

export const userInfo = (params, config = {}) => uni.$uv.http.post('/api/user/info', params, config)
export const userEdit = (params, config = {}) => uni.$uv.http.post('/api/user/edit', params, config)
export const userEditPassword = (params, config = {}) => uni.$uv.http.post('/api/user/edit/password', params, config)
export const userVip = (params, config = {}) => uni.$uv.http.post('/api/user/vip', params, config)
export const userIntegral = (params, config = {}) => uni.$uv.http.post('/api/user/integral', params, config)
export const userLog = (params, config = {}) => uni.$uv.http.post('/api/user/log', params, config)
export const userDistribution = (params, config = {}) => uni.$uv.http.post('/api/user/distribution', params, config)
export const userOrderPlace = (params, config = {}) => uni.$uv.http.post('/api/users/order/place', params, config)
export const userOrderLists = (params, config = {}) => uni.$uv.http.post('/api/users/order/lists', params, config)
export const userBouns = (params, config = {}) => uni.$uv.http.post('/api/user/bouns', params, config)
export const userTeam = (params, config = {}) => uni.$uv.http.post('/api/user/team', params, config)
export const userIntegraltask = (params, config = {}) => uni.$uv.http.post('/api/user/integraltask', params, config)

export const carmiExchange = (params, config = {}) => uni.$uv.http.post('/api/carmi/exchange', params, config)

export const index = (params, config = {}) => uni.$uv.http.post('/api/index', params, config)

export const news = (params, config = {}) => uni.$uv.http.post('/api/news', params, config)
export const newsInfo = (params, config = {}) => uni.$uv.http.post('/api/news/info', params, config)

export const chatIndex = (params, config = {}) => uni.$uv.http.post('/api/chat/index', params, config)
export const chatSend = (params, config = {}) => uni.$uv.http.post('/api/chat/send', params, config)
export const chatStream = (params, config = {}) => uni.$uv.http.post('/api/chat/stream', params, config)
export const chatHotQuestion = (params, config = {}) => uni.$uv.http.post('/api/chat/hot/question', params, config)

export const chatGroup = (params, config = {}) => uni.$uv.http.post('/api/chat/group', params, config)
export const chatGroupNew = (params, config = {}) => uni.$uv.http.post('/api/chat/group/new', params, config)
export const chatGroupEdit = (params, config = {}) => uni.$uv.http.post('/api/chat/group/edit', params, config)
export const chatGroupDel = (params, config = {}) => uni.$uv.http.post('/api/chat/group/del', params, config)
export const chatGroupEmpty = (params, config = {}) => uni.$uv.http.post('/api/chat/group/empty', params, config)

export const drawIndex = (params, config = {}) => uni.$uv.http.post('/api/draw/index', params, config)
export const drawGenerate = (params, config = {}) => uni.$uv.http.post('/api/draw/generate', params, config)
export const drawLists = (params, config = {}) => uni.$uv.http.post('/api/draw/lists', params, config)
export const drawSquare = (params, config = {}) => uni.$uv.http.post('/api/draw/square', params, config)
export const drawInfo = (params, config = {}) => uni.$uv.http.post('/api/draw/info', params, config)
export const drawLike = (params, config = {}) => uni.$uv.http.post('/api/draw/like', params, config)
export const drawLikeList = (params, config = {}) => uni.$uv.http.post('/api/draw/like/list', params, config)

export const applicationClass = (params, config = {}) => uni.$uv.http.post('/api/application/class', params, config)
export const applicationLists = (params, config = {}) => uni.$uv.http.post('/api/application/lists', params, config)
export const applicationInfo = (params, config = {}) => uni.$uv.http.post('/api/application/info', params, config)
export const applicationArticle = (params, config = {}) => uni.$uv.http.post('/api/application/article', params, config)
export const applicationArticleInfo = (params, config = {}) => uni.$uv.http.post('/api/application/article/info',
	params, config)

export const withdrawal = (params, config = {}) => uni.$uv.http.post('/api/withdrawal', params, config)
export const withdrawalPost = (params, config = {}) => uni.$uv.http.post('/api/withdrawal/post', params, config)