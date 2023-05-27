import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { ElementDTO, mapElementDtoToElementSaveDto } from 'src/types/dtoTypes';
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { useDeleteElementMutation } from 'src/hooks/ElementMutations';
import { PortfolioContext } from 'src/hooks/PortfolioContext';
import { ModalType } from 'src/types/portfolioContextTypes';


export interface PortfolioThumbnailProps {
    portfolio: ElementDTO;
}

export const PortfolioThumbnail = (props: PortfolioThumbnailProps) => {
    const navigate = useNavigate();
    const portfolio = props.portfolio;
    const { modalWindowData } = useContext(PortfolioContext);

    const deleteElement = useDeleteElementMutation(portfolio.id);

    const handleClick = (event: any) => {
        navigate("/portfolio/" + portfolio.id + "/edit")
    }

    const handleEditClick = (event: any) => {
        modalWindowData.set({
            values: mapElementDtoToElementSaveDto(portfolio),
            elementId: portfolio.id,
            modalType: ModalType.EditElement,
        });
    };

    const handleDeleteClick = (event: any) => {
        deleteElement.mutate();
    };

    return (
        <div
            key={`portfolio_${portfolio.id}}`}
            className="yourfolio-home__content__portfolios__portfolio"
        >
            <div
                className="yourfolio-home__content__portfolios__portfolio__thumbnail"
                style={{
                    backgroundColor: portfolio.style?.bgColor || "#b4b1ac",
                }}
                onClick={handleClick}
            ></div>
            <div className="yourfolio-home__content__portfolios__portfolio__title"
                onClick={handleClick}>
                {portfolio.name}
            </div>
            <div className="yourfolio-home__content__portfolios__portfolio__actions">
                <div className="yourfolio-home__content__portfolios__portfolio__actions__edit">
                    <FaEdit onClick={handleEditClick} />
                </div>
                <div className="yourfolio-home__content__portfolios__portfolio__actions__delete">
                    <FaTrashAlt onClick={handleDeleteClick} />
                </div>
            </div>
        </div>
    )
}

