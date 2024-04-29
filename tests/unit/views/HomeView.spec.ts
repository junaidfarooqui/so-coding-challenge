import { shallowMount } from '@vue/test-utils';
import HomeView from '@/views/HomeView.vue';
import ProductList from '@/components/ProductList.vue';

// Mock child component
jest.mock('@/components/ProductList.vue', () => ({
    name: 'ProductList',
    render: (h:any) => h('div'), // Mock render function for simplicity
}));

describe('HomeView.vue', () => {
    const wrapper = shallowMount(HomeView, {});

    it('renders the home view correctly', () => {
        expect(wrapper.exists()).toBe(true);
    });

    it('contains a header with a logo', () => {
        const header = wrapper.find('header');
        expect(header.exists()).toBe(true);  // Confirms the header is rendered

        const logo = header.find('.logo-img');
        expect(logo.exists()).toBe(true);  // Confirms the logo image is rendered

        const srcAttribute = logo.attributes('src');
        expect(srcAttribute).toBeDefined();  // Ensures the src attribute is defined
        expect(srcAttribute).toContain('logo.svg');  // Checks the src attribute content
    });

    it('includes the ProductList component', () => {
        const wrapper = shallowMount(HomeView, {});
        const productList = wrapper.findComponent(ProductList);
        expect(productList.exists()).toBe(true);
    });

    it('contains a footer with copyright text', () => {
        const footer = wrapper.find('footer');
        expect(footer.exists()).toBe(true);
        expect(footer.text()).toContain('copyright S.Oliver 2024');
    });

    afterEach(() => {
        wrapper.unmount();
    });
});
