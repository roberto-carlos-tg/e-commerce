import React from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { divIcon, point } from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import L from "leaflet";
import "leaflet-routing-machine";
import { useEffect, useState } from "react";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { MovileDescriptionRestaurantLocation } from "./MovileDescriptionRestaurantLocation/MovileDescriptionRestaurantLocation";
import { DescriptionRestauranLocation } from "./DescriptionRestauranLocation/DescriptionRestauranLocation";
import { SwiperRestaurantLocation } from "./SwiperRestaurantLocation/SwiperRestaurantLocation";
import "./restaurants.css";
const iconMap = `<svg version="1.1" x="0" y="0" viewBox="0 0 38.45 58.3 ">
<path
  d="M19.23 0C8.61 0 0 8.61 0 19.23c0 1.57.19 3.09.55 4.55.29 1.19.69 2.34 1.19 3.43l.7 1.39 14.25 28.14c1.05 2.08 4.03 2.08 5.08 0L36.01 28.6c.25-.45.49-.92.7-1.39.5-1.09.9-2.24 1.19-3.43.35-1.46.55-2.98.55-4.55C38.45 8.61 29.84 0 19.23 0z"
  fill="#cb261e"
/>
<path d="M15.34 32.18c-.27 0-.51-.02-.71-.05-1.3-.21-2.64-.55-3.68-.91l-.28-.15-.01-.07c-.02-.23 0-.41.01-.54.02-.29.03-.38-.25-.53l-.02-.01c-.22-.19-.43-.21-.69-.24-.27-.03-.57-.06-.97-.27-.39-.21-.98-.66-1.26-.96-.18-.19-.35-.46-.53-.76l-.01-.02c-.29-.47-.63-1.01-1.03-1.26l-.02-.01a.138.138 0 0 0-.04-.03l-.03-.02c-.02-.02-.04-.03-.05-.05l-.02-.02c-.02-.02-.03-.04-.05-.06l-.03-.03c-.01-.02-.03-.04-.04-.06l-.03-.04-.03-.06-.05-.09.07-.07-.08.04-.04-.08.07-.07-.09.04-.04-.08.07-.07-.08.05-.25-.66-.04-.13a9.62 9.62 0 0 0-.12-.74c-.07-.35-.13-.64-.12-1.21-.1-1.75 1-2.56 1.66-2.88.32-.16.57-.23.83-.23.2 0 .38.04.61.09l.06.01c.09.02.2.04.31.06.45.08.68.11.88.11.21 0 .41-.04.73-.1.08-.02.15-.03.23-.04.43-.25.65-.27.83-.27h.08c.12 0 .24 0 .63-.38l.04-.04c.5-.48.66-.64.82-1.52-.31.05-.74.15-1.24.25-1.03.23-2.3.51-3.06.51-.44 0-.68-.09-.76-.29-.09-.22.05-.49.44-.88l.07-.07c.12-.12.13-.13.24-.28.01-.01.04-.06.07-.1.02-.03.04-.06.04-.07.03-.06.05-.09.06-.11 0-.02.01-.05.02-.1l.01-.04.04-.04c.13-.08.24-.29.35-.52.33-.64.83-1.62 2.52-1.72h.09c.11-.01.22-.01.28-.02-.65-.6-2.02-3-2.14-3.7-.03-.33-.01-.78.01-1.22v-.02c.01-.28.02-.55.01-.78v-.12l.12-.02c.1-.02.18-.03.25-.03.21 0 .32.07.47.18l.06.04.1.3c.38.9.84 1.81 1.96 2.17.71.23 1.06.3 1.56.3.22 0 .46-.01.82-.03.09-.01.19-.01.29-.01h.04c.29 0 .56-.01.74-.12l.03-.02h.07c.03 0 .08.01.2.01.51 0 1.61-.1 1.95-.16l.8-.07 2.83-.01.9.01c.49.01.83.03 1.11.06.27.02.52.04.85.04.27 0 .58-.02.95-.05 1.37-.19 2.02-.45 2.87-1.14.38-.31.64-.66.84-1.14.07-.17.1-.37.13-.56.06-.4.12-.84.62-.84l.09.03c.17.14.28.26.37.38l.02.02c.05.06.1.12.16.18l.02.03.02.06c.09.54.05.97.01 1.46-.01.1-.02.2-.02.3-.02.12-.04.22-.05.34l-.01.04c-.03.18-.05.38-.1.55-.17.66-.94 1.96-1.43 2.41-.22.21-.45.36-.64.5-.25.17-.45.31-.56.49l.51.18c1.9.57 2.73 1.63 3.46 2.56.3.38.58.74.9 1.03l.03.02.02.05.02.22c.07.41.05.64-.07.79-.14.17-.38.2-.77.2l-.11-.01-.66-.31-.92-.66c-.33-.16-.93-.28-1.51-.28-.27 0-.52.02-.74.07l.63.43-.01.08c-.05.33-.12.54-.17.7-.13.37-.14.41.74 1.34.16.17.21.21.36.33l.04.03c.6.47.8 1.12 1.03 1.87.16.51.32 1.04.64 1.59.04.07.08.15.12.22.28.56-.39 1.42-.88 2.04-.09.11-.17.21-.23.3-.1.14-.22.27-.36.37-.17.13-.33.27-.49.4-1.14.96-2.13 1.79-6.36 1.41-.03.03-.06.07-.09.1-.25.29-.55.48-.82.65-.21.13-.37.23-.46.34l-.02.02-.04.02c-.12.04-.23.09-.34.14-.18.08-.37.17-.58.22-.14.04-.33.07-.52.09-.16.02-.35.05-.45.08l-1.09 1.26-.08-.02c-.21-.03-.45-.05-.72-.05-.46 0-.95.05-1.38.09-.46.08-.93.12-1.36.12zm-4.5-1.23.18.1c1.01.36 2.34.69 3.64.9.2.03.42.05.68.05.42 0 .89-.05 1.33-.09.45-.05.94-.1 1.41-.1.27 0 .51.02.73.05l1.06-1.22.02-.01c.12-.04.32-.07.51-.09.18-.02.37-.05.5-.09.2-.05.37-.13.54-.21.12-.06.23-.1.34-.15.11-.13.28-.24.48-.36.27-.17.56-.35.79-.62.05-.06.09-.1.13-.15l.03-.03h.04c4.19.37 5.15-.43 6.26-1.37.16-.13.32-.27.49-.4.12-.1.23-.21.32-.33.06-.09.14-.19.23-.3.43-.55 1.08-1.38.86-1.84l-.12-.21c-.32-.56-.5-1.13-.65-1.63-.22-.72-.42-1.34-.97-1.78l-.04-.03c-.15-.12-.21-.16-.38-.35-.93-.97-.94-1.07-.78-1.52.05-.15.12-.35.16-.64l-.86-.59.19-.06c.27-.08.62-.13.99-.13.61 0 1.24.12 1.61.3l.92.66.63.29h.05c.32 0 .53-.02.62-.13.08-.1.09-.29.03-.64l-.02-.19c-.34-.3-.61-.66-.91-1.03-.72-.91-1.53-1.94-3.37-2.5l-.71-.25.04-.09c.11-.27.37-.45.67-.66.19-.13.41-.29.62-.48.47-.43 1.21-1.68 1.37-2.32.04-.16.07-.36.09-.53l.01-.04c.02-.12.03-.23.05-.34 0-.09.01-.19.02-.29.04-.48.07-.9-.01-1.41-.06-.07-.11-.12-.16-.18V7.9c-.09-.11-.18-.22-.33-.34-.31.01-.36.27-.42.68-.03.21-.06.42-.14.61-.21.51-.49.88-.9 1.21-.89.72-1.56.99-2.97 1.18-.38.03-.69.05-.97.05-.33 0-.59-.02-.86-.05-.28-.02-.62-.05-1.1-.06l-.9-.01-2.82.01-.78.06c-.33.06-1.45.17-1.97.17-.09 0-.16 0-.21-.01-.23.13-.53.14-.82.14h-.04c-.09 0-.18 0-.28.01-.37.02-.61.03-.84.03-.52 0-.89-.07-1.62-.31-1.19-.37-1.68-1.33-2.08-2.27l-.09-.26c-.14-.1-.21-.15-.36-.15-.05 0-.11 0-.18.01.01.23 0 .5-.01.75v.02c-.02.43-.04.88.02 1.19.13.77 1.78 3.52 2.2 3.68l.27.1-.47.14c-.08.01-.2.02-.3.03-.05 0-.08 0-.1.01-1.58.1-2.05 1.01-2.36 1.62-.13.25-.24.46-.39.57-.01.04-.01.06-.01.07 0 .03-.01.05-.03.07-.01.02-.03.05-.06.1-.02.02-.04.05-.05.08-.03.04-.06.1-.07.11-.11.16-.13.18-.26.3l-.07.07c-.4.39-.44.58-.4.67.04.11.25.17.58.17.74 0 1.99-.28 3-.5.58-.13 1.08-.24 1.39-.28l.13-.02-.02.13c-.18 1.06-.36 1.23-.9 1.75l-.05.04c-.38.37-.54.43-.76.43h-.08c-.15 0-.34.02-.75.25l-.03.01c-.09.01-.16.03-.23.04-.35.06-.55.1-.78.1-.21 0-.45-.03-.91-.11-.12-.01-.23-.03-.32-.05l-.05-.01c-.51-.11-.8-.14-1.33.12-.62.3-1.65 1.05-1.56 2.7-.01.56.05.84.11 1.16.04.21.09.44.12.77l.19.54-.08.06.09-.04.23.48.05.09c.02.03.03.05.04.06l.01.02c.02.03.03.04.05.06l-.05.08.07-.07.04.04-.03.09.07-.07c.01 0 .01.01.02.01l.01.01c.45.27.8.83 1.1 1.33l.01.02c.18.28.34.55.5.72.27.29.84.72 1.21.92.36.19.65.22.9.25.27.03.52.05.78.28.38.21.36.41.34.71 0 .12-.01.28 0 .48z" fill="#ffffff" />
<path d="m8.96 25.64.04.04c.12.14.21.52.31.92.07.29.15.6.24.8.12.29.18.5.23.66.1.34.15.52.55.89.71.64 1.65 1.3 3.21 1.3.07-.4-.1-.58-.31-.81-.07-.08-.14-.16-.21-.25-.16-.21-.27-.42-.39-.67-.07-.13-.13-.26-.21-.4-.4-.71-.46-.93-.53-1.2-.06-.23-.14-.5-.45-1.15-.25-.4-.39-.79-.53-1.21-.12-.36-.25-.73-.47-1.13-.13-.25-.23-.44-.31-.6-.31-.62-.31-.62-1.31-1.12l-.06-.01c-.37-.18-.78-.29-1.11-.29-.4 0-.89.15-.98.88v.03c-.28 2.21-.3 2.81-.26 2.93.09.31.92 2.01 1.09 2.22.37.47 1.36 1.38 1.9 1.41-.03-.11-.08-.25-.13-.41-.28-.83-.74-2.23-.34-2.8l.03-.03zM12.27 15.45c-.26.19-.53.39-.87.51l-.11.04.07-.1c.13-.21.25-.29.44-.43.05-.03.1-.07.16-.12.13-.1.22-.16.29-.2.16-.11.2-.13.29-.31-.11.02-.19.05-.27.08-.12.04-.23.08-.39.1-.24.04-.4.04-.51.04-.3 0-.3 0-1.06.73l-.14.14c-.17.17-.31.33-.44.49-.12.15-.24.3-.4.45l-.07.07c-.3.29-.55.53-.66.99.28-.06.5-.14.73-.24.17-.07.35-.14.56-.2.19-.05.39-.08.6-.11.31-.05.64-.09.91-.22 1.03-.47 1.46-1.09 1.43-2.07-.19.09-.37.22-.56.36zM14.15 14.3c.45-.23.79-1.55.6-2.33-.04 0-.07-.01-.11-.01-.14 0-.25.04-.37.07-.13.04-.26.08-.43.08-.17 0-.35-.04-.56-.13-.22-.08-.45-.14-.69-.19-.31-.07-.6-.14-.82-.27-.58-.34-.82-.81-1.05-1.27-.15-.29-.29-.57-.52-.82.05.79.21 1.78.55 2.33.16.26.24.43.34.64.05.11.11.24.2.4.24.46 1.46 1.59 2.42 1.59.15.01.31-.02.44-.09zM25.69 15.81c.28.95 2.85 1.22 3.87 1.32-.71-.63-2.88-1.36-3.64-1.36-.14 0-.2.02-.23.04zM23.64 14.93c.21 0 .45-.02.75-.05.31-.03.69-.06 1.14-.07 1.18-.05 1.6-.55 1.93-.95.14-.18.27-.33.44-.42.26-.14.41-.2.49-.24.13-.06.13-.06.25-.21.06-.07.14-.19.29-.36.08-.1.16-.19.25-.28.2-.22.4-.44.56-.76.41-.79.8-2.36.5-3.02l-.05.07c-.06.09-.12.19-.18.29-.37.59-.82 1.34-1.3 1.7-.04.03-.09.07-.14.11-.29.23-.73.57-.99.63-.27.06-.45.06-.62.07-.25 0-.48.01-.98.19-.4.15-.64.15-.89.16-.21 0-.42.01-.74.09-.17.04-.3.06-.41.06-.2 0-.29-.06-.38-.12a.424.424 0 0 0-.28-.09c-.08 0-.17.01-.29.04a.85.85 0 0 0-.56.45c-.25.54-.07 1.43.23 2.07.2.49.44.64.98.64zM13.73 18.85v.31c.03 0 .07.01.12.04v-.01c.01-.01.01-.03.02-.04l.26-1.41c.12-.63.25-.82.81-.82.06 0 .13 0 .21.01h.01l.01.01c.75.69.73 1.16.55 2.4l1.29.06c-.25-.87.15-1.82.66-2.28l.01-.01h.02c.79-.02 1.16.4 1.16 1.33l-.14 1.13 1.84.2c-.12-2.08-.57-4.58-2-4.81-.1-.02-.2-.03-.29-.03-.65 0-.85.45-1.07.92l-.03.06-.04-.05-.52-.65a.905.905 0 0 0-.68-.31c-.51 0-1.09.38-1.4.93-.2.34-.8 2.48-.8 3.02z" fill="#ffffff" />
<path d="M15.11 17.24h-.04c-.09 0-.21.03-.28.05.04.06.04.09.05.11.01 0 .02.01.03.01.04.01.11.03.22.08l.02.01.08.52c.16-.07.25-.14.27-.23.03-.09 0-.2-.1-.36-.02-.05-.22-.18-.25-.19zM18.4 17.45l-.48-.04.43.59c.05.07.05.07.07.08.01 0 .02.01.04.02.11-.22.08-.29.01-.45-.02-.06-.05-.12-.07-.2zM12.27 15.45c-.26.19-.53.39-.87.51l-.11.04.07-.1c.13-.21.25-.29.44-.43.05-.03.1-.07.16-.12.13-.1.22-.16.29-.2.16-.11.2-.13.29-.31-.11.02-.19.05-.27.08-.12.04-.23.08-.39.1-.24.04-.4.04-.51.04-.3 0-.3 0-1.06.73l-.14.14c-.17.17-.31.33-.44.49-.12.15-.24.3-.4.45l-.07.07c-.3.29-.55.53-.66.99.28-.06.5-.14.73-.24.17-.07.35-.14.56-.2.19-.05.39-.08.6-.11.31-.05.64-.09.91-.22 1.03-.47 1.46-1.09 1.43-2.07-.19.09-.37.22-.56.36zM11.62 30.97l3.14.56c.23.02.47.03.75.03.33 0 .67-.01.99-.03.26-.01.53-.02.8-.02.69-.01 1.54-.02 1.6-.68-.52-.19-2.39-.28-3.52-.28-.22 0-.41 0-.54.01-.25.01-.46.05-.67.08-.24.04-.47.07-.72.07-.24 0-.48-.03-.74-.1-.15-.04-.29-.09-.44-.13-.29-.1-.57-.19-.86-.19-.13 0-.24.02-.36.05-.05.49.1.52.57.63zM8.96 25.64l.04.04c.12.14.21.52.31.92.07.29.15.6.24.8.12.29.18.5.23.66.1.34.15.52.55.89.71.64 1.65 1.3 3.21 1.3.07-.4-.1-.58-.31-.81-.07-.08-.14-.16-.21-.25-.16-.21-.27-.42-.39-.67-.07-.13-.13-.26-.21-.4-.4-.71-.46-.93-.53-1.2-.06-.23-.14-.5-.45-1.15-.25-.4-.39-.79-.53-1.21-.12-.36-.25-.73-.47-1.13-.13-.25-.23-.44-.31-.6-.31-.62-.31-.62-1.31-1.12l-.06-.01c-.37-.18-.78-.29-1.11-.29-.4 0-.89.15-.98.88v.03c-.28 2.21-.3 2.81-.26 2.93.09.31.92 2.01 1.09 2.22.37.47 1.36 1.38 1.9 1.41-.03-.11-.08-.25-.13-.41-.28-.83-.74-2.23-.34-2.8l.03-.03zM25.69 15.81c.28.95 2.85 1.22 3.87 1.32-.71-.63-2.88-1.36-3.64-1.36-.14 0-.2.02-.23.04zM23.64 14.93c.21 0 .45-.02.75-.05.31-.03.69-.06 1.14-.07 1.18-.05 1.6-.55 1.93-.95.14-.18.27-.33.44-.42.26-.14.41-.2.49-.24.13-.06.13-.06.25-.21.06-.07.14-.19.29-.36.08-.1.16-.19.25-.28.2-.22.4-.44.56-.76.41-.79.8-2.36.5-3.02l-.05.07c-.06.09-.12.19-.18.29-.37.59-.82 1.34-1.3 1.7-.04.03-.09.07-.14.11-.29.23-.73.57-.99.63-.27.06-.45.06-.62.07-.25 0-.48.01-.98.19-.4.15-.64.15-.89.16-.21 0-.42.01-.74.09-.17.04-.3.06-.41.06-.2 0-.29-.06-.38-.12a.424.424 0 0 0-.28-.09c-.08 0-.17.01-.29.04a.85.85 0 0 0-.56.45c-.25.54-.07 1.43.23 2.07.2.49.44.64.98.64z" fill="#ffffff"/>
<path d="m18.4 17.45-.48-.04.43.59c.05.07.05.07.07.08.01 0 .02.01.04.02.11-.22.08-.29.01-.45-.02-.06-.05-.12-.07-.2zM15.11 17.24h-.04c-.09 0-.21.03-.28.05.04.06.04.09.05.11.01 0 .02.01.03.01.04.01.11.03.22.08l.02.01.08.52c.16-.07.25-.14.27-.23.03-.09 0-.2-.1-.36-.02-.05-.22-.18-.25-.19z" fill="#ffffff"/>
<path d="M13.73 18.85v.31c.03 0 .07.01.12.04v-.01c.01-.01.01-.03.02-.04l.26-1.41c.12-.63.25-.82.81-.82.06 0 .13 0 .21.01h.01l.01.01c.75.69.73 1.16.55 2.4l1.29.06c-.25-.87.15-1.82.66-2.28l.01-.01h.02c.79-.02 1.16.4 1.16 1.33l-.14 1.13 1.84.2c-.12-2.08-.57-4.58-2-4.81-.1-.02-.2-.03-.29-.03-.65 0-.85.45-1.07.92l-.03.06-.04-.05-.52-.65a.905.905 0 0 0-.68-.31c-.51 0-1.09.38-1.4.93-.2.34-.8 2.48-.8 3.02zM14.15 14.3c.45-.23.79-1.55.6-2.33-.04 0-.07-.01-.11-.01-.14 0-.25.04-.37.07-.13.04-.26.08-.43.08-.17 0-.35-.04-.56-.13-.22-.08-.45-.14-.69-.19-.31-.07-.6-.14-.82-.27-.58-.34-.82-.81-1.05-1.27-.15-.29-.29-.57-.52-.82.05.79.21 1.78.55 2.33.16.26.24.43.34.64.05.11.11.24.2.4.24.46 1.46 1.59 2.42 1.59.15.01.31-.02.44-.09z" fill="#ffffff" />
<path d="M14.15 14.3c.45-.23.79-1.55.6-2.33-.04 0-.07-.01-.11-.01-.14 0-.25.04-.37.07-.13.04-.26.08-.43.08-.17 0-.35-.04-.56-.13-.22-.08-.45-.14-.69-.19-.31-.07-.6-.14-.82-.27-.58-.34-.82-.81-1.05-1.27-.15-.29-.29-.57-.52-.82.05.79.21 1.78.55 2.33.16.26.24.43.34.64.05.11.11.24.2.4.24.46 1.46 1.59 2.42 1.59.15.01.31-.02.44-.09zM11.62 30.97l3.14.56c.23.02.47.03.75.03.33 0 .67-.01.99-.03.26-.01.53-.02.8-.02.69-.01 1.54-.02 1.6-.68-.52-.19-2.39-.28-3.52-.28-.22 0-.41 0-.54.01-.25.01-.46.05-.67.08-.24.04-.47.07-.72.07-.24 0-.48-.03-.74-.1-.15-.04-.29-.09-.44-.13-.29-.1-.57-.19-.86-.19-.13 0-.24.02-.36.05-.05.49.1.52.57.63zM8.96 25.64l.04.04c.12.14.21.52.31.92.07.29.15.6.24.8.12.29.18.5.23.66.1.34.15.52.55.89.71.64 1.65 1.3 3.21 1.3.07-.4-.1-.58-.31-.81-.07-.08-.14-.16-.21-.25-.16-.21-.27-.42-.39-.67-.07-.13-.13-.26-.21-.4-.4-.71-.46-.93-.53-1.2-.06-.23-.14-.5-.45-1.15-.25-.4-.39-.79-.53-1.21-.12-.36-.25-.73-.47-1.13-.13-.25-.23-.44-.31-.6-.31-.62-.31-.62-1.31-1.12l-.06-.01c-.37-.18-.78-.29-1.11-.29-.4 0-.89.15-.98.88v.03c-.28 2.21-.3 2.81-.26 2.93.09.31.92 2.01 1.09 2.22.37.47 1.36 1.38 1.9 1.41-.03-.11-.08-.25-.13-.41-.28-.83-.74-2.23-.34-2.8l.03-.03zM12.27 15.45c-.26.19-.53.39-.87.51l-.11.04.07-.1c.13-.21.25-.29.44-.43.05-.03.1-.07.16-.12.13-.1.22-.16.29-.2.16-.11.2-.13.29-.31-.11.02-.19.05-.27.08-.12.04-.23.08-.39.1-.24.04-.4.04-.51.04-.3 0-.3 0-1.06.73l-.14.14c-.17.17-.31.33-.44.49-.12.15-.24.3-.4.45l-.07.07c-.3.29-.55.53-.66.99.28-.06.5-.14.73-.24.17-.07.35-.14.56-.2.19-.05.39-.08.6-.11.31-.05.64-.09.91-.22 1.03-.47 1.46-1.09 1.43-2.07-.19.09-.37.22-.56.36zM25.69 15.81c.28.95 2.85 1.22 3.87 1.32-.71-.63-2.88-1.36-3.64-1.36-.14 0-.2.02-.23.04zM15.11 17.24h-.04c-.09 0-.21.03-.28.05.04.06.04.09.05.11.01 0 .02.01.03.01.04.01.11.03.22.08l.02.01.08.52c.16-.07.25-.14.27-.23.03-.09 0-.2-.1-.36-.02-.05-.22-.18-.25-.19zM23.64 14.93c.21 0 .45-.02.75-.05.31-.03.69-.06 1.14-.07 1.18-.05 1.6-.55 1.93-.95.14-.18.27-.33.44-.42.26-.14.41-.2.49-.24.13-.06.13-.06.25-.21.06-.07.14-.19.29-.36.08-.1.16-.19.25-.28.2-.22.4-.44.56-.76.41-.79.8-2.36.5-3.02l-.05.07c-.06.09-.12.19-.18.29-.37.59-.82 1.34-1.3 1.7-.04.03-.09.07-.14.11-.29.23-.73.57-.99.63-.27.06-.45.06-.62.07-.25 0-.48.01-.98.19-.4.15-.64.15-.89.16-.21 0-.42.01-.74.09-.17.04-.3.06-.41.06-.2 0-.29-.06-.38-.12a.424.424 0 0 0-.28-.09c-.08 0-.17.01-.29.04a.85.85 0 0 0-.56.45c-.25.54-.07 1.43.23 2.07.2.49.44.64.98.64zM17.92 17.42l.43.58c.05.07.05.07.07.08.01 0 .02.01.04.02.11-.22.08-.29.01-.45-.02-.05-.05-.11-.07-.19l-.48-.04z" fill="#ffffff" />
<path d="M14.51 15.84c-.19.33-.79 2.47-.78 3.01v.31c.03 0 .07.01.12.04v-.01c.01-.01.01-.03.02-.04l.26-1.41c.12-.63.25-.82.81-.82.06 0 .13 0 .21.01h.01l.01.01c.75.69.73 1.16.55 2.4l1.29.06c-.25-.87.15-1.82.66-2.28l.01-.01h.02c.79-.02 1.16.4 1.16 1.33l-.14 1.13 1.84.2c-.12-2.08-.57-4.58-2-4.81-.1-.02-.2-.03-.29-.03-.65 0-.85.45-1.07.92l-.03.06-.04-.05-.52-.65a.905.905 0 0 0-.68-.31c-.53.01-1.1.39-1.42.94zM17.71 23.47zM12.88 22.87c.14.05.31.09.52.15-.21-.05-.38-.1-.52-.15zM12.45 22.7c.11.05.24.11.43.17-.19-.06-.32-.11-.43-.17zM23.01 22.89c.12.08.23.17.33.26a7.49 7.49 0 0 0-.33-.26zM5.6 23.81c-.01-.1-.01-.2-.01-.29 0 .09 0 .19.01.29zM23.62 23.46c.08.11.16.22.22.34-.07-.12-.14-.23-.22-.34zM12.97 28.21zM6.21 22.05c-.02.08-.05.15-.07.22.02-.07.05-.15.07-.22zM17.71 23.47c-.47.06-.99.09-1.59.08-.29-.01-.51-.03-.71-.07.2.03.43.06.71.07.59.01 1.12-.02 1.59-.08zM14.19 29.84a2.01 2.01 0 0 1-.41-.31c.13.12.26.22.41.31zM5.95 24.47c-.01.06-.01.12-.02.17.01-.05.01-.11.02-.17zM5.99 23.99c-.01.1-.02.19-.02.27.01-.08.01-.17.02-.27zM5.89 25.05c-.08-.22-.14-.43-.19-.64.04.21.11.43.19.64zM13.28 28.84c-.1-.19-.2-.39-.31-.62.1.22.2.43.31.62zM16.14 30.13c.18-.01.37-.03.58-.06-.2.03-.4.04-.58.06zM6.69 20.98a.704.704 0 0 0 0 0zM5.99 23.99c.03-.34.06-.8.08-1.42.01-.09.04-.19.07-.3-.03.11-.05.21-.07.3-.02.62-.05 1.08-.08 1.42zM12.09 25.92c.02.06.04.11.06.16l.18.47-.18-.47c-.02-.05-.04-.1-.06-.16zM22.14 29.31c.06-.05.13-.1.19-.15l.07-.05-.07.05c-.06.06-.13.11-.19.15zM14.53 23.27c-.12-.03-.24-.05-.38-.07-.3-.07-.54-.13-.75-.18l.75.18c.14.02.26.05.38.07zM12.37 22.66c-.12-.07-.2-.13-.3-.21-.02-.02-.05-.04-.07-.06.02.02.05.04.07.06.1.08.19.15.3.21zM11.53 24.24c-.23-.65-.5-1.32-.81-1.86.31.54.58 1.22.81 1.86zM22.4 29.11l.07-.05c.06-.05.13-.11.21-.17-.08.06-.15.12-.21.17l-.07.05zM10.71 22.39zM23.97 26.31c-.02.19-.05.37-.08.55.03-.17.05-.36.08-.55zM20.38 30.06zM23.73 27.6zM21.23 29.83zM20.71 30c-.11.03-.22.05-.33.06l.33-.06zM7 20.74c.13-.06.29-.08.48-.08-.19-.01-.35.02-.48.08zM22.03 22.48c-.14-.03-.28-.04-.42-.04-.33 0-.66.09-1.05.23.38-.13.72-.23 1.05-.23.14 0 .28.01.42.04zM5.65 22.7zM24.03 24.52c.01.13.02.28.02.44-.01-.16-.01-.31-.02-.44zM5.59 23.51c0-.19.01-.38.03-.55-.03.18-.04.36-.03.55zM20.16 22.81c.14-.05.28-.1.4-.15-.12.05-.25.1-.4.15zM6.47 21.39l-.09.21c.03-.08.06-.15.09-.21zM17.14 30.04c.14-.01.29-.01.44-.01.19 0 .37.01.55.01-.18-.01-.36-.01-.55-.01-.16-.01-.3 0-.44.01zM11.53 24.24c.13.37.25.73.35 1.05.03.08.05.15.07.23-.02-.07-.05-.15-.07-.23-.11-.31-.22-.67-.35-1.05zM9.37 21.2c-.15-.07-.32-.15-.49-.22.17.07.34.15.49.22z" fill="#ffffff"/>
<path d="M24.03 24.52c-.01-.06-.01-.13-.02-.18a1.72 1.72 0 0 0-.18-.54 1.79 1.79 0 0 0-.22-.34c-.08-.11-.18-.21-.28-.3a2.1 2.1 0 0 0-.33-.26c-.29-.2-.63-.34-.97-.41-.14-.03-.28-.04-.42-.04-.33 0-.66.09-1.05.23-.13.04-.26.09-.4.15-.53.2-1.15.42-1.92.57-.17.03-.35.06-.54.09-.47.06-.99.09-1.59.08-.29-.01-.51-.03-.71-.07s-.37-.08-.55-.12c-.11-.03-.22-.06-.33-.08-.12-.03-.24-.05-.38-.07-.3-.07-.54-.13-.75-.18-.21-.05-.38-.1-.52-.15-.19-.06-.32-.12-.43-.17-.03-.01-.05-.03-.08-.04-.12-.07-.2-.13-.3-.21-.02-.02-.05-.04-.07-.06-.17-.13-.41-.3-.94-.55-.15-.07-.3-.15-.47-.23-.87-.45-2.08-1.04-3.04-1.04-.5 0-.88.16-1.15.48-.12.14-.24.31-.35.5-.18.32-.32.7-.39 1.12-.02.09-.03.17-.04.26-.02.18-.03.36-.03.55 0 .1.01.19.01.29.02.2.05.4.09.61.05.21.11.42.19.64 0-.06.01-.12.02-.22.01-.05.01-.11.02-.19.01-.05.01-.11.02-.17.01-.06.01-.14.02-.22s.01-.17.02-.27c.03-.34.06-.8.08-1.42.01-.09.04-.19.07-.3.02-.07.04-.15.07-.22.05-.15.11-.31.17-.45l.09-.21c.03-.07.06-.13.09-.19.04-.09.09-.16.13-.22.08-.11.18-.19.31-.25s.29-.08.48-.08c.27 0 .57.06.87.15.18.05.36.12.54.19.17.07.34.14.49.22.25.12.47.24.61.33.16.1.31.25.45.44.1.12.19.26.28.42.31.53.58 1.21.81 1.86.13.37.25.73.35 1.05.03.08.05.15.07.23.05.15.09.28.13.4.02.06.04.11.06.16l.18.47c.24.65.45 1.21.65 1.67.1.23.2.44.31.62.16.28.32.51.51.69.12.12.26.23.41.31.37.21.83.31 1.45.31.16 0 .32-.01.5-.02s.37-.03.58-.06c.13-.02.27-.03.41-.04.14-.01.29-.01.44-.01.19 0 .37.01.55.01l.53.03c.34.02.65.04.97.04.14 0 .29 0 .45-.02.1-.01.21-.02.32-.04l.33-.06c.06-.01.11-.03.17-.04.11-.03.23-.07.35-.12.29-.12.6-.28.92-.52.06-.05.13-.1.19-.15l.07-.05.07-.05c.06-.05.13-.11.21-.17.33-.26.74-.61.85-.78.03-.04.05-.09.08-.14.05-.1.09-.23.13-.37.06-.21.12-.47.16-.73.03-.18.06-.36.08-.55.05-.47.08-.95.08-1.35-.03-.17-.03-.32-.04-.45zm-2.87 2.11c-.56.37-2.02-.76-1.85-1.35.11-.4.32-.44.71-.58.97-.34 1.14-.04 1.94.17-.08.83-.25 1.39-.8 1.76z" fill="#ffffff" />
<path d="M7.49 27.48c.37.47 1.36 1.38 1.9 1.41-.03-.11-.08-.25-.13-.41-.28-.83-.74-2.23-.34-2.8l.03-.05.04.04c.12.14.21.52.31.92.07.29.15.6.24.8.12.29.18.5.23.66.1.34.15.52.55.89.71.64 1.65 1.3 3.21 1.3.07-.4-.1-.58-.31-.81-.07-.08-.14-.16-.21-.25-.16-.21-.27-.42-.39-.67-.07-.13-.13-.26-.21-.4-.4-.71-.46-.93-.53-1.2-.06-.23-.14-.5-.45-1.15-.25-.4-.39-.79-.53-1.21-.12-.36-.25-.73-.47-1.13-.13-.25-.23-.44-.31-.6-.31-.62-.31-.62-1.31-1.12h-.05c-.37-.18-.78-.29-1.11-.29-.4 0-.89.15-.98.88v.03c-.28 2.21-.3 2.81-.26 2.93.09.31.92 2.01 1.08 2.23zM12.72 30.61c-.15-.04-.29-.09-.44-.13-.29-.1-.57-.19-.86-.19-.13 0-.24.02-.36.05-.06.49.08.52.55.62l3.14.56c.23.02.47.03.75.03.33 0 .67-.01.99-.03.26-.01.53-.02.8-.02.69-.01 1.54-.02 1.6-.68-.52-.19-2.39-.28-3.52-.28-.22 0-.41 0-.54.01-.25.01-.46.05-.67.08-.24.04-.47.07-.72.07-.22.01-.46-.02-.72-.09zM12.27 15.45c-.26.19-.53.39-.87.51l-.11.04.07-.1c.13-.21.25-.29.44-.43.05-.03.1-.07.16-.12.13-.1.22-.16.29-.2.16-.11.2-.13.29-.31-.11.02-.19.05-.27.08-.12.04-.23.08-.39.1-.24.04-.4.04-.51.04-.3 0-.3 0-1.06.73l-.14.14c-.17.17-.31.33-.44.49-.12.15-.24.3-.4.45l-.07.07c-.3.29-.55.53-.66.99.28-.06.5-.14.73-.24.17-.07.35-.14.56-.2.19-.05.39-.08.6-.11.31-.05.64-.09.91-.22 1.03-.47 1.46-1.09 1.43-2.07-.19.09-.37.22-.56.36zM14.15 14.3c.45-.23.79-1.55.6-2.33-.04 0-.07-.01-.11-.01-.14 0-.25.04-.37.07-.13.04-.26.08-.43.08-.17 0-.35-.04-.56-.13-.21-.08-.45-.14-.69-.19-.31-.07-.6-.14-.82-.27-.58-.34-.82-.81-1.05-1.27-.15-.29-.29-.57-.52-.82.05.79.21 1.78.55 2.33.16.26.24.43.34.64.05.11.11.24.2.4.24.46 1.46 1.59 2.42 1.59.15.01.31-.02.44-.09zM23.64 14.93c.21 0 .45-.02.75-.05.31-.03.69-.06 1.14-.07 1.18-.05 1.6-.55 1.93-.95.14-.18.27-.33.44-.42.26-.14.41-.2.49-.24.13-.06.13-.06.25-.21.06-.07.14-.19.29-.36.08-.1.16-.19.25-.28.2-.22.4-.44.56-.76.41-.79.8-2.36.5-3.02l-.05.07c-.06.09-.12.19-.18.29-.37.59-.82 1.34-1.3 1.7-.04.03-.09.07-.14.11-.29.23-.73.57-.99.63-.27.06-.45.06-.62.07-.25 0-.48.01-.98.19-.4.15-.64.15-.89.16-.21 0-.42.01-.74.09-.17.04-.3.06-.41.06-.2 0-.29-.06-.38-.12a.424.424 0 0 0-.28-.09c-.08 0-.17.01-.29.04a.85.85 0 0 0-.56.45c-.25.54-.07 1.43.23 2.07.2.49.44.64.98.64zM25.69 15.81c.28.95 2.85 1.22 3.87 1.32-.71-.63-2.88-1.36-3.64-1.36-.14 0-.2.02-.23.04zM15.11 17.24h-.04c-.09 0-.21.03-.28.05.04.06.04.09.05.11.01 0 .02.01.03.01.04.01.11.03.22.08l.02.01.08.52c.16-.07.25-.14.27-.23.03-.09 0-.2-.1-.36-.02-.05-.22-.18-.25-.19z" fill="#ffffff"/>
<path d="M14.51 15.84c-.19.33-.79 2.47-.78 3.01v.31c.03 0 .07.01.12.04v-.01c.01-.01.01-.03.02-.04l.26-1.41c.12-.63.25-.82.81-.82.06 0 .13 0 .21.01h.01l.01.01c.75.69.73 1.16.55 2.4l1.29.06c-.25-.87.15-1.82.66-2.28l.01-.01h.02c.79-.02 1.16.4 1.16 1.33l-.14 1.13 1.84.2c-.12-2.08-.57-4.58-2-4.81-.1-.02-.2-.03-.29-.03-.65 0-.85.45-1.07.92l-.03.06-.04-.05-.52-.65a.905.905 0 0 0-.68-.31c-.53.01-1.1.39-1.42.94z" fill="#ffffff"/>
<path d="m18.4 17.45-.48-.04.43.59c.05.07.05.07.07.08.01 0 .02.01.04.02.11-.22.08-.29.01-.45-.02-.06-.05-.12-.07-.2z" fill="#ffffff" />
</svg>`;
const markers = [
  {
    geocode: [-2.7407747, -78.8494491],
    popUp: "Emilio Abad",
  },
  {
    geocode: [-2.7446874, -78.8483158],
    popUp: "Hotel",
  },
  {
    geocode: [-2.7419321, -78.8476359],
    popUp: "cafe",
  },
];

export const Restaurantes = () => {
  const [map, setMap] = useState(null);
  const { isActiveDescriptionRestauranLocation } = useSelector(
    (state) => state?.restaurantMapLocation
  );

  const [currentPosition, setCurrentPosition] = useState({
    lat: 0,
    lng: 0,
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        setCurrentPosition({
          lng: position.coords.longitude,
          lat: position.coords.latitude,
        });
      },
      function (error) {
        console.log(error);
      },
      {
        enableHighAccuracy: true,
      }
    );
  }, []);

  const customIcon = L.divIcon({
    html: `<div class="mapIcon">${iconMap}</div> `,
    iconSize: [38, 38],
    className: "bg-transarent",
  });

  const createCustomClusterIcon = (cluster) => {
    return new divIcon({
      html: `<div class="cluster-icon-map">${cluster.getChildCount()}</div>`,
      iconSize: point(33, 33, true),
    });
  };

  const findNearestPoint = () => {
    if (currentPosition) {
      const nearestPoint = markers.reduce(
        (nearest, point) => {
          const distance = calculateDistance(currentPosition, point.geocode);
          return distance < nearest.distance ? { ...point, distance } : nearest;
        },
        { distance: Infinity }
      );

      console.log(nearestPoint);
    }

    return null;
  };

  const calculateDistance = (location1, location2) => {
    const latLng1 = L.latLng({ lat: location1?.lat, lng: location1?.lng }); //po
    const latLng2 = L.latLng({ lat: location2[0], lng: location2[1] });
    return latLng1.distanceTo(latLng2);
  };

  const displayMap = useMemo(
    () => (
      <div className="mx-auto max-w-5xl  z-[10] relative">
        <MapContainer
          center={[-2.7404828, -78.8507159]}
          zoom={15}
          ref={setMap}
          bounceAtZoomLimits={true}
          className="h-[26rem] w-full pt-20"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <MarkerClusterGroup
            chunkedLoading
            iconCreateFunction={createCustomClusterIcon}
          >
            {markers.map((markers, index) => (
              <Marker icon={customIcon} key={index} position={markers.geocode}>
                <Popup>
                  <h2>{markers.popUp}</h2>
                </Popup>
              </Marker>
            ))}
          </MarkerClusterGroup>
        </MapContainer>
      </div>
    ),
    []
  );

  return (
    <>
      {displayMap}
      {map ? (
        <>
          <div
            className={`md:h-52  bg-moss-green relative z-20 hidden sm:block ${
              isActiveDescriptionRestauranLocation ? "h-96" : "h-max"
            }`}
          >
            {isActiveDescriptionRestauranLocation === false ? (
              <div
                className={`md:max-w-4xl sm:max-w-xl max-w-sm h-full mx-auto  z-30  `}
              >
                <SwiperRestaurantLocation map={map} />
              </div>
            ) : (
              ""
            )}

            <div className="absolute bottom-[1rem] left-0 right-0">
              {isActiveDescriptionRestauranLocation && (
                <DescriptionRestauranLocation map={map} />
              )}
            </div>
            {/* MODO CELULAR */}
          </div>
          <MovileDescriptionRestaurantLocation map={map} />
        </>
      ) : null}

      {/* <h1>posicion actual {JSON.stringify(currentPosition)}</h1>
      <button
        type="button"
        className="bg-blue-500 text-white py-2 px-2  rounded-lg"
        onClick={findNearestPoint}
      >
        La ruta mas cercana es
      </button> */}
    </>
  );
};
