import { shallowMount, flushPromises } from '@vue/test-utils';
import ProductGallery from '@/components/ProductGallery.vue';

describe('ProductGallery', () => {
    const pictures = ['image1.jpg', 'image2.jpg', 'image3.jpg'];
    const wrapper = shallowMount(ProductGallery, { props: { pictures } });

    it('renders gallery with correct number of images', async () => {

        const images = wrapper.findAll('.slide');
        expect(images).toHaveLength(pictures.length);
    });

    it('updates currentIndex when goToSlide is called', async () => {

        const newIndex = 1;
        await wrapper.vm.goToSlide(newIndex);

        expect(wrapper.vm.currentIndex).toBe(newIndex);
    });

    it('applies correct background style for slides', async () => {

        const slides = wrapper.findAll('.slide');
        slides.forEach((slideWrapper: any, index:number) => {
            expect(slideWrapper.attributes('style')).toContain(`background-image: url(${pictures[index]})`);
        });
    });

    it('updates currentIndex on dot click and applies active class correctly', async () => {

        const dots = wrapper.findAll('.nav-dot');
        await dots[2].trigger('click');
        expect(wrapper.vm.currentIndex).toBe(2);
        expect(dots[2].classes()).toContain('active');
    });

    it('computes the correct transform style based on currentIndex', async () => {

        const testIndex = 1;
        const expectedTransform = `translateX(-${100 * testIndex}%)`;

        await wrapper.vm.goToSlide(testIndex);
        const container = wrapper.find('.slides-container');

        expect((container.element as HTMLElement).style.transform).toBe(expectedTransform);
    });
});
