"use client";
import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import Author from "../Child/author";
import { useState, useEffect } from "react";
import { GrEdit } from "react-icons/gr";
import axios from "axios";

interface Post {
  id: number;
  title: string;
  content: string;
  date_created: string;
  date_change: string;
  comments: string;
  user_id: string;
  image_path: string;
}

const SectionPosts = () => {
  const [latestPostState, setLatestPostState] = useState<Post[]>([]);
  const [dropwdown, setDropdown] = useState(false);
  const [showIconEdit, setShowIconEdit] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchLatestPost = async () => {
      try {
        const response = await axios.get(`http://localhost:3333/latestpost/`);
        if (response.status === 200) {
          const responseData = response.data;
          setLatestPostState(responseData);
        }
      } catch (error: any) {}
    };
    fetchLatestPost();
  }, []);

  useEffect(() => {
    const cookies = document.cookie.split(";");
    let token = null;

    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();

      if (cookie.startsWith("blogstarguide.token=")) {
        token = cookie.substring("blogstarguide.token=".length, cookie.length);
        break;
      }
    }

    if (token) {
      try {
        const decodedToken = JSON.parse(atob(token.split(".")[1]));
        const user_permission_id = decodedToken.user_permission_id;

        if (!token || user_permission_id !== 1) {
          setShowIconEdit(false);
        } else {
          setShowIconEdit(true);
        }
      } catch (error) {}
    }
  }, []);

  function EnableDropdown() {
    setDropdown((prevState) => !prevState);
  }

  useEffect(() => {
    function disableDropdown(event: MouseEvent) {
      event.stopPropagation();
      const clickedElement = event.target as HTMLElement;
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(clickedElement) &&
        !clickedElement.classList.contains("dropdown-link")
      ) {
        setDropdown(false);
      }
    }

    document.addEventListener("mousedown", disableDropdown);

    return () => {
      document.removeEventListener("mousedown", disableDropdown);
    };
  }, []);

  return (
    <section className="container mx-auto md:px-20 py-10 sml:p-4 sml639:p-4 sm639:p-4 md:p-4">
      <h1 className="font-bold text-4xl py-12 text-center">Mais recente</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-14">
        {latestPostState.map((post) => (
          <div key={post.id}>
            <LatestPost post={post} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default SectionPosts;

const LatestPost = ({ post }: { post: Post }) => {
  const formattedDate = new Date(post.date_created).toLocaleDateString(
    "pt-BR",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  return (
    <div className="item sml:flex sml:flex-col sml:justify-center sml:items-center">
      <div className="images relative">
        <Link href={`/pages/posts/${post.id}`}>
          <Image
            src={`http://localhost:3333/${post.image_path}`}
            width={450}
            height={350}
            style={{ width: "auto", height: "auto" }}
            alt="Picture Blog"
            className="rounded-md drop-shadow-2xl"
          />
        </Link>
        <button className="bg-slate-400 rounded-md border-none absolute top-0 right-0 p-1">
          <GrEdit color="#111" />
        </button>
      </div>
      <div className="info flex justify-center flex-col py-4 sml:py-2"></div>

      <div className="title">
        <div className="cat sml:pb-1 sml:flex sml:justify-start sml:items-start">
          <Link href={`/pages/posts/${post.id}`}>
            <span className="text-orange-600 hover:text-orange-800 mr-1">
              Criado em:
            </span>
          </Link>
          <Link href={`/pages/posts/${post.id}`}>
            <span className="text-gray-800 hover:text-gray-600">
              {formattedDate}
            </span>
          </Link>
        </div>
        <Link href={`/pages/posts/${post.id}`}>
          <p className="text-xl font-bold text-gray-800 hover:text-gray-600">
            {post.title}
          </p>
        </Link>
        {post.content.length > 40 ? (
          <div>
            <p className="text-gray-500 py-3">
              {post.content}
              <Link
                className="font-bold ml-1 text-black"
                href={`/pages/posts/${post.id}`}
              >
                Ver mais...
              </Link>
            </p>
          </div>
        ) : (
          <div>
            <p className="text-gray-500 py-3">{post.content}</p>
          </div>
        )}

        <Author>
        </Author>
      </div>
    </div>
  );
};
