import React, { useState } from 'react';
import { MessageSquare, Plus, Send, MapPin, Sparkles, User, HeartHandshake, X } from 'lucide-react';
import { CommunityPost } from '../types';

interface CommunitySectionProps {
  posts: CommunityPost[];
  onPostCreated: (post: CommunityPost) => void;
  onReplySubmitted: (postId: string, reply: { responderName: string; message: string }) => void;
}

export const CommunitySection: React.FC<CommunitySectionProps> = ({
  posts,
  onPostCreated,
  onReplySubmitted
}) => {
  const [filterType, setFilterType] = useState<'all' | 'offer' | 'request' | 'meetup'>('all');
  const [activeReplyPostId, setActiveReplyPostId] = useState<string | null>(null);
  const [responderName, setResponderName] = useState('');
  const [replyMessage, setReplyMessage] = useState('');
  const [isSubmittingReply, setIsSubmittingReply] = useState(false);

  // New post modal state
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [newPostType, setNewPostType] = useState<'offer' | 'request' | 'meetup'>('offer');
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostAuthor, setNewPostAuthor] = useState('');
  const [newPostNeighborhood, setNewPostNeighborhood] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostContact, setNewPostContact] = useState('');
  const [isCreatingPost, setIsCreatingPost] = useState(false);

  const filteredPosts = posts.filter((p) => {
    if (filterType === 'all') return true;
    return p.type === filterType;
  });

  const handleReplySubmit = async (postId: string) => {
    if (!responderName || !replyMessage) return;
    setIsSubmittingReply(true);
    try {
      await (await import('../services/api')).api.replyToCommunityPost(postId, {
        responderName: responderName.trim(),
        message: replyMessage.trim()
      });
      onReplySubmitted(postId, {
        responderName: responderName.trim(),
        message: replyMessage.trim()
      });
      setReplyMessage('');
      setActiveReplyPostId(null);
    } catch (err) {
      console.error('Error replying:', err);
    } finally {
      setIsSubmittingReply(false);
    }
  };

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostTitle || !newPostAuthor || !newPostContent) return;

    setIsCreatingPost(true);
    try {
      const created = await (await import('../services/api')).api.createCommunityPost({
        type: newPostType,
        title: newPostTitle.trim(),
        authorName: newPostAuthor.trim(),
        neighborhood: newPostNeighborhood.trim() || 'Central District',
        content: newPostContent.trim(),
        contactMethod: newPostContact.trim() || 'Via FEEDLINK Community Liaison'
      });

      onPostCreated(created);
      setIsPostModalOpen(false);
      // Reset form
      setNewPostTitle('');
      setNewPostAuthor('');
      setNewPostNeighborhood('');
      setNewPostContent('');
      setNewPostContact('');
    } catch (err) {
      console.error('Error creating post:', err);
    } finally {
      setIsCreatingPost(false);
    }
  };

  return (
    <section id="connect" className="py-16 sm:py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 uppercase tracking-wider mb-1">
              <HeartHandshake className="w-4 h-4 text-indigo-600" />
              <span>Connecting People. Changing Lives.</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
              Neighbor-to-Neighbor Community Hub
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-2xl">
              Charity is strongest when neighbors connect directly. Share surplus garden yields, request pantry pickup assistance, or organize local skill-shares.
            </p>
          </div>

          <button
            onClick={() => setIsPostModalOpen(true)}
            className="self-start md:self-end px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 active:scale-98 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-sm flex items-center gap-2 whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            <span>Post an Offer or Request</span>
          </button>
        </div>

        {/* Filter Bar */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-200/70 rounded-xl mb-8 w-fit overflow-x-auto">
          {(['all', 'offer', 'request', 'meetup'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-4 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-all capitalize whitespace-nowrap ${
                filterType === type
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {type === 'all' ? 'All Exchanges' : `${type}s`}
            </button>
          ))}
        </div>

        {/* Exchange Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => {
            const isReplying = activeReplyPostId === post.id;

            return (
              <div
                key={post.id}
                className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs hover:shadow-sm transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  {/* Clean unboxed category header */}
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="font-bold uppercase tracking-wider text-2xs text-indigo-700">
                      {post.type === 'offer' ? 'Giving / Offer' : post.type === 'request' ? 'Neighbor Request' : 'Community Meetup'}
                    </span>
                    <span>
                      {new Date(post.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 leading-snug">
                    {post.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {post.content}
                  </p>

                  <div className="pt-2 border-t border-slate-100 text-2xs text-slate-500 space-y-1">
                    <div className="flex items-center gap-1 font-medium text-slate-700">
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      <span>{post.authorName}</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-slate-500">{post.neighborhood}</span>
                    </div>
                    <div className="text-slate-500 italic">
                      Contact: {post.contactMethod}
                    </div>
                  </div>

                  {/* Existing Responses */}
                  {post.responses && post.responses.length > 0 && (
                    <div className="pt-3 border-t border-slate-100 space-y-2">
                      <span className="text-2xs font-bold text-slate-500 uppercase tracking-wider block">
                        Community Responses ({post.responses.length})
                      </span>
                      <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
                        {post.responses.map((resp) => (
                          <div key={resp.id} className="p-2.5 bg-slate-50 rounded-lg text-2xs border border-slate-100">
                            <div className="flex items-center justify-between font-bold text-slate-800">
                              <span>{resp.responderName}</span>
                              <span className="text-slate-400 font-normal">
                                {new Date(resp.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                              </span>
                            </div>
                            <p className="text-slate-600 mt-1 leading-normal">{resp.message}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Reply section */}
                <div className="pt-4 mt-4 border-t border-slate-100">
                  {isReplying ? (
                    <div className="space-y-2 bg-slate-50 p-3 rounded-xl border border-slate-200">
                      <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                        <span>Send Helpful Response</span>
                        <button
                          onClick={() => setActiveReplyPostId(null)}
                          className="text-slate-400 hover:text-slate-600"
                        >
                          Cancel
                        </button>
                      </div>
                      <input
                        type="text"
                        placeholder="Your name..."
                        value={responderName}
                        onChange={(e) => setResponderName(e.target.value)}
                        className="w-full px-2.5 py-1.5 text-2xs bg-white border border-slate-300 rounded-lg text-slate-900"
                      />
                      <textarea
                        rows={2}
                        placeholder="How can you help or connect?"
                        value={replyMessage}
                        onChange={(e) => setReplyMessage(e.target.value)}
                        className="w-full px-2.5 py-1.5 text-2xs bg-white border border-slate-300 rounded-lg text-slate-900"
                      />
                      <button
                        onClick={() => handleReplySubmit(post.id)}
                        disabled={isSubmittingReply || !responderName || !replyMessage}
                        className="w-full py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-2xs rounded-lg transition-colors flex items-center justify-center gap-1 disabled:opacity-50"
                      >
                        <Send className="w-3 h-3" />
                        <span>Send Reply</span>
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        setActiveReplyPostId(post.id);
                        if (!responderName) setResponderName('');
                      }}
                      className="w-full py-2 px-3 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors flex items-center justify-center gap-1.5"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-indigo-600" />
                      <span>Connect / Reply ({post.repliesCount})</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Create Post Modal */}
        {isPostModalOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="relative bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <h3 className="text-lg font-bold text-slate-900">
                  New Community Post
                </h3>
                <button
                  onClick={() => setIsPostModalOpen(false)}
                  className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreatePost} className="space-y-4 pt-4">
                <div>
                  <label className="text-xs font-bold text-slate-600 block mb-1">
                    Post Category
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['offer', 'request', 'meetup'] as const).map((type) => (
                      <button
                        type="button"
                        key={type}
                        onClick={() => setNewPostType(type)}
                        className={`py-2 text-xs font-bold rounded-lg border capitalize ${
                          newPostType === type
                            ? 'bg-indigo-50 border-indigo-500 text-indigo-700'
                            : 'bg-white border-slate-200 text-slate-700'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-600 block mb-1">
                    Title / Summary
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Surplus homegrown squash & apples"
                    value={newPostTitle}
                    onChange={(e) => setNewPostTitle(e.target.value)}
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-slate-300 rounded-xl text-slate-900"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-600 block mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Liam T."
                      value={newPostAuthor}
                      onChange={(e) => setNewPostAuthor(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-xl text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-600 block mb-1">
                      Neighborhood / Area
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. North Terrace"
                      value={newPostNeighborhood}
                      onChange={(e) => setNewPostNeighborhood(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-xl text-slate-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-600 block mb-1">
                    Details
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Describe what you are offering, what assistance you need, or meetup details..."
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-xl text-slate-900"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-600 block mb-1">
                    How should neighbors contact you?
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Pickup at Community Garden gate, or leave reply below"
                    value={newPostContact}
                    onChange={(e) => setNewPostContact(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-xl text-slate-900"
                  />
                </div>

                <div className="pt-2 border-t border-slate-200 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsPostModalOpen(false)}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isCreatingPost || !newPostTitle || !newPostAuthor || !newPostContent}
                    className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl disabled:opacity-50"
                  >
                    {isCreatingPost ? 'Publishing...' : 'Publish to Community Hub'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
