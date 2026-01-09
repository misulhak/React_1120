import React from 'react';
import './Gallery.css';

function GalleryControls({
    searchTerm, setSearchTerm,
    sortCriteria, setSortCriteria,
    selectedArtist, setSelectedArtist,
    selectedYear, setSelectedYear,
    artists, years
}) {

    return (
        <div className="search-and-sort-controls">

            <div className="filter-controls">

                <select
                    value={selectedArtist}
                    onChange={(e) => setSelectedArtist(e.target.value)}
                    className="filter-select"
                >
                    {artists.map(artist => (
                        <option key={artist} value={artist === '모든 작가' ? '' : artist}>
                            {artist}
                        </option>
                    ))}
                </select>

                <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className="filter-select"
                >
                    {years.map(year => (
                        <option key={year} value={year === '모든 연도' ? '' : year}>
                            {year}
                        </option>
                    ))}
                </select>
            </div>

            <div className="search-bar">
                <input
                    type="text"
                    placeholder="제목 또는 작가 검색..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
            </div>

            <div className="sort-controls">
                <label htmlFor="sort-select">정렬 기준:</label>
                <select
                    id="sort-select"
                    value={sortCriteria}
                    onChange={(e) => setSortCriteria(e.target.value)}
                    className="sort-select"
                >
                    <option value="year_desc">최신순 (연도 ↓)</option>
                    <option value="year_asc">오래된순 (연도 ↑)</option>
                    <option value="title_asc">제목순 (가나다순)</option>
                </select>
            </div>
        </div>
    );
}

export default GalleryControls;