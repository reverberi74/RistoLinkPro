import React from 'react';
import CustomImage from './CustomImage';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentCategory } from '../../store/slices/categorySlice';

const CategoryItem = ({ category }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { all: categories } = useSelector((state) => state.categories);

    const handleNavigate = (categoryId) => {
        const activeCategory = categories.find((item) => item._id == categoryId);
        dispatch(setCurrentCategory(activeCategory));
        navigate(`/private/products/${categoryId}`);
    };

    return (
        <div
            onClick={() => handleNavigate(category._id)}
            key={category._id}
            className="cursor-pointer block relative bg-white rounded-3xl shadow-elevation-1 p-4 mb-[2.5rem] min-h-[5.9375rem] flex items-center justify-between transition-all active:scale-[0.98]"
        >
            <div className="max-w-[10.1875rem]">
                <div className="flex-1 pr-3">
                    <h4 className="text-base font-semibold text-text leading-tight">
                        {category.name}
                    </h4>
                    <p className="text-xs text-muted mt-2 leading-snug">
                        {category.description}
                    </p>
                </div>
            </div>
            <CustomImage
                src={category.image}
                alt={category.name}
                className="absolute top-[-1.25rem] right-[1rem] w-[9.75rem] h-[9.75rem] sm:w-[8rem] sm:h-[8rem] object-contain z-10"
            />
        </div>
    )
};

export default CategoryItem;