// 获取用户的语言偏好
function getUserLanguage() {
    // 首先检查本地存储中是否有保存的语言偏好
    const savedLang = localStorage.getItem('userLanguage');
    if (savedLang) {
        return savedLang;
    }
    
    // 如果没有保存的语言偏好，默认使用英文
    return 'en';
}

// 更新页面上的所有文本
function updatePageLanguage(lang) {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const keys = element.getAttribute('data-i18n').split('.');
        let value = translations[lang];
        
        // 遍历键路径获取翻译值
        for (const key of keys) {
            if (value && value[key]) {
                value = value[key];
            } else {
                value = null;
                break;
            }
        }
        
        if (value) {
            element.textContent = value;
        }
    });
    
    // 更新语言切换按钮的激活状态
    document.querySelectorAll('.lang-switch').forEach(btn => {
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    // 保存语言偏好
    localStorage.setItem('userLanguage', lang);
}

// 初始化语言设置
document.addEventListener('DOMContentLoaded', () => {
    // 设置初始语言
    const initialLang = getUserLanguage();
    updatePageLanguage(initialLang);
    
    // 添加语言切换按钮的点击事件
    document.querySelectorAll('.lang-switch').forEach(btn => {
        btn.addEventListener('click', () => {
            const newLang = btn.getAttribute('data-lang');
            updatePageLanguage(newLang);
        });
    });
}); 