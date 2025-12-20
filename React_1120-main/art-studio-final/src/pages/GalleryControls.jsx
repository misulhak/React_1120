import React from 'react';
import './Gallery.css';
// Gallery.css에 컨트롤러 관련 스타일이 정의되어 있다고 가정합니다.

function GalleryControls({
    searchTerm, setSearchTerm,
    sortCriteria, setSortCriteria,
    selectedArtist, setSelectedArtist,
    selectedYear, setSelectedYear,
    artists, years
}) {

    return (
        <div className="search-and-sort-controls">

            {/* 필터 드롭다운 메뉴 */}
            <div className="filter-controls">

                {/* 작가 필터 */}
                <select
                    value={selectedArtist}
                    onChange={(e) => setSelectedArtist(e.target.value)}
                    className="filter-select"
                >
                    {/* artists 배열은 ['모든 작가', '작가A', '작가B', ...] 형태입니다. */}
                    {artists.map(artist => (
                        <option key={artist} value={artist === '모든 작가' ? '' : artist}>
                            {artist}
                        </option>
                    ))}
                </select>

                {/* 연도 필터 */}
                <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className="filter-select"
                >
                    {/* years 배열은 ['모든 연도', 2024, 2023, ...] 형태입니다. */}
                    {years.map(year => (
                        <option key={year} value={year === '모든 연도' ? '' : year}>
                            {year}
                        </option>
                    ))}
                </select>
            </div>

            {/* 검색 입력 필드 */}
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="제목 또는 작가 검색..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
            </div>

            {/* 정렬 컨트롤 */}
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